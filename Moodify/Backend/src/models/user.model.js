const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username must be unique"],
        required:[true,"username is required"]
    },
     email:{
        type:String,
        unique:[true,"username must be unique"],
        required:[true,"username is required"]
    },
     password:{
        type:String,
        required:[true,"username is required"],
        select:false
    }


})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel