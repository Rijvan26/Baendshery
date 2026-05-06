require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")
const ImageKit = require("@imagekit/nodejs/index.js")
const {toFile} = require("@imagekit/nodejs/index.js")
const bcrypt = require("bcrypt")
const followModel = require("../model/follow.model")
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function registerController (req,res)  {
    const {username, email,password, bio, profilePic} = req.body
     const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "profile-pic",
        folder:"cohort2-Instaclone"
    })

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
     return   res.status(409).json({
           message: isUserAlreadyExists.email === email ? "email already exist " : "username is already exist"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profilePic:file.url,
        password:hash

    })

    const token = jwt.sign({
        id: user._id,
         username:user.username
    },process.env.JWT_SECRET,
    {expiresIn: "1d"})

    res.cookie("token", token ,{
        httpOnly: true, // this will prevent client side js to access the cookie, this is important for security
        sameSite: true, // this will allow cookie to be sent in cross-origin request only if the request is from the same site. This is important for security, especially when your frontend and backend are on different domains.
        secure:true, // this will ensure cookie is sent only over https, this is important for security, especially in production
        maxAge: 15 * 60 * 1000
    })

    res.status(201).json({
        message: "user register successfully",
        user:{
            email:user.email,
            username:user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        }
    })

}

async function loginController (req,res)  {
    const {username, email, password} = req.body
    const user = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email:email
            }
        ]
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }


    const isPasswordValid = await bcrypt.compare( password, user.password )


    if(!isPasswordValid){
        return res.status(400).json({
            message:"wrong password"
        })
    }
    const token = jwt.sign({
        id:user._id,
        username: user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})


    // this is begginer level
    // res.cookie("token", token)

    // advance cokkie send and res.cookie allow only 3 arguments
    res.cookie("token", token, {
    httpOnly: true, //only allow http request
    secure: true, // true in production
    sameSite: true ,// this will allow cookie to be sent in cross-origin request only if the request is from the same site. This is important for security, especially when your frontend and backend are on different domains.
    maxAge: 15 * 60 * 1000, // 15 minutes in ms

})


    res.status(200).json({
        message:"user logged in successfully",
        user:{
            username:user.username,
            email: user.email,
            bio: user.bio,
            profilePic:user.profilePic
        }
    })
}

async function getMeController (req,res) {
    const userId = req.user.id

   try{
    const user = await userModel.findById(userId)
     if(!user){
        return res.status(404).json({
            message:"user not found"
        })
     }
     console.log(user)

      res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profilePic:user.profilePic
        }
    })
   } catch(err) {
     return res.status(404).json({
        message:"user not found"
   })
   }

   
}

async function logoutController (req,res) {
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"token not found"
        })
    } 
    res.clearCookie("token")

    res.status(200).json({
        message:"user logged out successfully",
    })
}
    
async function suggestionController (req,res) {
    const currentUsername = req.user.username
    const users = await userModel.find({
        username: {$ne: currentUsername}
    }).select("username profilePic  ").lean()

    const userWithFollowdata = await Promise.all(
        users.map(async (u) => {
            const isFollowing = await followModel.findOne({
                follower:currentUsername,
                followee: u.username
            })
             
        return ({
                ...u,
                isFollowing: Boolean(isFollowing)
            })
        })

    )

    res.status(200).json({
        message: "suggestions retrieved successfully",
        suggestedUsers: userWithFollowdata
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController,
    suggestionController
}