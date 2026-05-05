const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already taken"],
        required:[true, "user name is required"]
    },
    email:{
        type:String,
        unique:[true, "email already exist"],
        required:[true, "email name is required"]
    },
    password:{
        type:String,
        required:[true, " password is required"],
        select:false
    },
    bio: String,

    profilePic:{
        type: String,
        default: "https://ik.imagekit.io/nnxrkxddlh/74a3b6a8856b004dfff824ae9668fe9b.webp",


    },
    followers:[{
           type: mongoose.Schema.Types.ObjectId,
           ref:"user"
    }],
    followings:[{
           type: mongoose.Schema.Types.ObjectId,
           ref:"user"
    }]

})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel