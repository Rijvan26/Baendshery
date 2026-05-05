const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type:String,
        default:""
    },
    Image_url:{
        type: String,
        require:[true, "image url required for post creation"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true, "user id required for post creation"]
    }
})


const postModel  = mongoose.model("post", postSchema)

module.exports = postModel