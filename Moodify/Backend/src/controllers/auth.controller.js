require("dotenv").config()
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const blackListModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

const registerController = async (req,res) => {
   console.log("REQ.BODY:", req.body)
     const {username, email, password} = req.body


     const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
     })


     if(isUserAlreadyExist){
           return res.status(400).json({
            message:"user already exist with this detailes"
           })
     }

     const hash = await bcrypt.hash(password, 10)

     const user = await userModel.create({
        username,
        email,
        password:hash
     })

     const token = jwt.sign({
        id:user._id,
        user:user.username
     },process.env.JWT_SECRET,{expiresIn:"1d"})

     res.cookie("token", token)

     res.status(201).json({
        message:"user register successfully",
        user
     })
}

const loginController = async (req,res) => {
     const {username,email,password} = req.body


     const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
     }).select("+password")


     if(!user){
           return res.status(400).json({
            message:"user not found"
           })
     }

     const isPasswordValid = await bcrypt.compare(password,user.password)
    
     if(!isPasswordValid){
         return res.status(400).json({
            message:"wrong password"
         })
     }


     const token = jwt.sign({
        id:user._id,
        user:user.username
     },process.env.JWT_SECRET,{expiresIn:"1d"})

     res.cookie("token", token)

     res.status(201).json({
        message:"user logged in successfully",
        user
     })
     console.log("REQ.USER:", req.user)
}

const getMeController = async (req,res) => {
   const user = await userModel.findById(req.user.id)

   res.status(200).json({
      message:"user fetched successfully",
      user
   })
}


const logoutController = async (req, res) => {
   const token = req.cookies.token


   res.clearCookie("token")

   await redis.set(token, Date.now().toString(),"EX", 60*60)

   res.status(200).json({
      message:"user logoout successfully"
   })
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}