const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
       user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true, "user required for post creation"]
       },
       caption:{
        type:String,
        default:""
       },
       img_Url:{
        type:String,
        required:[true, "imgage  required for post creation"]
        
       }
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel