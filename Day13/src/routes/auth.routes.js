require("dotenv").config()
const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")


authRouter.post("/register", async(req,res) => {
    const {name, email, password} = req.body
const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist) {
        res.status(400).json({
            message:"user already exist with this"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

     const user = await  userModel.create({
        email,password:hash , name
    })

  const token = jwt.sign(
    {
        id: user._id,
        email: user.email
    },
    process.env.JWT_SECRET
  )


    res.cookie("jwt_token", token)
   

    res.status(201).json({
        message: "user regisster successfully",
        user,
        token

    })

})

authRouter.post("/protected", (req,res) => {
    console.log(req.headers)
    console.log(req.cookies)

   
    res.status(200).json({
        message:"this is protected"
    })
})

authRouter.post("/login", async(req,res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    
    if(!user) {
        res.status(404).json({
            message:"user does not exists"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token" , token)
    res.status(200).json({
        message: "user logged in",
        user,
        token
    })
})
module.exports = authRouter


