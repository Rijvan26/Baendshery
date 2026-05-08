const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:false,
    },
    title:{
        type:String,
        required:true   
    },
    mood: {
        type:String,
        enum:{
            values:["happy", "sad", "surprised"]
        },
        message:"enum this is "
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel