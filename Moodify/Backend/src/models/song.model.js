const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
    },
    posterUrl:{
        type:String,
        required:false,
    },
    title:{
        type:String,
        required:true   
    },
    artist:{
        type:String,
        required:false,
        default:"Unknown Artist"
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