const express = require("express")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function userRegisterController (req,res) {
    const {username, email, password, bio, profilePic} = req.body

      const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
      })

      if(isUserAlreadyExists) {
        return res.status(403).json({
            message:"user already exists" + (isUserAlreadyExists ===  email ?" user exist with this email" : "this username is already taken")
        })
      }


      // if(!isPasswordValid){
      //   return res.status(403).json({
      //     message:"password must be 8 characters"
      //   })
      // }
      const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profilePic,
        password:hash
    })

    const token = jwt.sign({
      id:user._id,
      username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token", token)

    res.status(201).json({
      message:"user register successfully",
      user
    })
}

async function userLoginController (req,res) {
        const {username,email,password} = req.body

        const user = await userModel.findOne({
          $or:[
            {username: username},
            {email:email}
          ]
        })

        if(!user){
          return res.status(404).json({
            message:"invalid credientals "
          })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
          return res.status(403).json({
            message:"wrong password"
          })
        }

        const token = jwt.sign({
          id:user._id,
          username:user.username
        },process.env.JWT_SECRET, {expiresIn:"1d"})

        res.cookie("token", token)

        res.status(200).json({
          message:"user logged in successfully",
          user
        })
}

module.exports = {
  userRegisterController,
  userLoginController
}