import userModel from "../models/user.model.js"
import { sendEmail } from "../services/mail.service.js"

import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  console.log("Register started");

  const { username, email, password } = req.body;

  console.log("Received data");

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }]
  });

  console.log("User existence checked");

  if (isUserExist) {
    console.log("User already exists");

    return res.status(400).json({
      success: false,
      message: "User already exists"
    });
  }

  console.log("Creating user");

  const user = await userModel.create({
    username,
    email,
    password
  });

  console.log("User created");

  console.log("About to send email");

  await sendEmail({...})

  console.log("Email sent");

  return res.status(201).json({....})
};

export async function verifyEmail(req,res) {
    const {token} = req.query

    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findOne({
        email:decoded.email
    })

    if(!user) {
        return res.status(400).json({
            success:false,
            message:"invalid token",
            error:"user not found"

        })
    }

    if(user.isVerified) {
        return res.status(400).json({
            message:"email already verified",
        })
    }

    user.isVerified = true
    await user.save()

    const html = `<h1>Email verified successfully</h1>
        <p>Your email has been verified successfully. You can now log in to your account.</p>`
        
      return  res.send(html)
    } catch{
        res.status(400).json({
            message:"invalid token",
            success:false,
        })
    }

   

}

export async function resendVerificationEmail(req,res) {
    const {email} = req.body

    const user = await userModel.findOne({
        email
    }) 

    if(!user) {
        return res.status(400).json({
            message:"user not found",
            success:false
        })
    }

    if(user.isVerified) {
        return res.status(400).json({
            message:"email already verified",
            success:false
        })
    }

    const emailverificationToken = jwt.sign({
        email:user.email,
    },process.env.JWT_SECRET,{expiresIn:"15m"})

   try {
     await sendEmail({
        to:email,
        subject:"Verify your email",
        html:`<h1>Verify your email</h1>\n<p>Hi ${user.username},</p>\n<p>Please verify your email by clicking the link below:</p>\n<a href="http://localhost:3000/api/auth/verify-email?token=${emailverificationToken}">Verify Email</a>`
    })
   } catch (err) {
      console.log(err)

      return res.status(500).json({
        success:false,
        message:"failed to send email"

      })
   }

    res.status(200).json({
        message:"verification email sent successfully",
        success:true
    })
}

export async function getme(req,res) {
    const user = await userModel.findById(req.user.id).select("-password")

    if(!user) {
        return res.status(404).json({
            message:"user not found",
            success:false
        })  
    }
    res.status(200).json({
        success:true,
        message:"user fetched successfully",
        user})
}


export async function LoginUser(req,res)  {
    const {email,password} = req.body

    const user = await userModel.findOne({
        email
    }).select("+password")

    if(!user) {
        return res.status(400).json({
            message:"invalid email or password",
            error:"user not found"
        })
    }

    const passwordMatch = await user.comparePassword(password)

    if(!passwordMatch){
        return res.status(400).json({
            message:'invalid token or password',
            error:"invalid password"
        })
    }

    if(!user.isVerified){
        return res.status(400).json({
            message:"email not verified", 
            error:"please verify your email"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})


   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none"
})

    res.json({
        success:true,
        message:"user logged in successfully",
        user:{
            id:user._id,
            username:user.username
        }
    })
}
