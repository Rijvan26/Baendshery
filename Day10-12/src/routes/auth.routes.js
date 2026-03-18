require("dotenv").config()
const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const {name, email,password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist) {
        res.status(400).json({
            message:"user already exist with this"
        })
    }

     const user = await  userModel.create({
        email,password, name
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
    console.log(req.cookies)
    res.status(200).json({
        message:"cookies accepted"
    })
})

module.exports = authRouter