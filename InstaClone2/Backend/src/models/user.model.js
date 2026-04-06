const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required"],
        unique:[true, "this username is already taken"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true, "this email is already taken"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    bio:String,
    profilePic:{
        type:String,
        default: "https://ik.imagekit.io/nnxrkxddlh/74a3b6a8856b004dfff824ae9668fe9b.webp",

    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel