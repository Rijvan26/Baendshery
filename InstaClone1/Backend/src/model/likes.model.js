const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        res:"posts",
        requied:[true, "post id required for creatting liked post"]
    },
    user:{
        type:String,
        required:[true, "username is required for creating like"]
    }
},
{timestamps:true})

likeSchema.index({post:1, user:1}, {unique:true})

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel