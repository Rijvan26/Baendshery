const songModel = require("../models/song.model")
const storageService = require("../services/storage.services")

const id3 = require("node-id3")
const uploadSong = async (req, res) => {
  try {


    const songBuffer = req.file.buffer


    const mood = req.body.mood


    const tags = id3.read(songBuffer)


   
    const songFile = await storageService.uploadFile({
      buffer: songBuffer,
      filename: (tags.title || "test") + ".mp3",
      folder: "/cohot2/moodify/songs"
    })


    let posterFile = null

    if (tags.image && tags.image.imageBuffer) {


      posterFile = await storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: (tags.title || "test") + ".jpg",
        folder: "/cohot2/moodify/posters"
      })

    }

    const song = await songModel.create({
      title: tags.title || "Unknown",
      url: songFile.url,
      posterUrl: posterFile ? posterFile.url : null,
      mood
    })


    res.status(201).json({
      message: "song uploaded successfully",
      song
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      message: "Failed to upload song",
      error: err.message
    })
  }
}

const getSongs = async (req,res) => {
    try {
        const {mood} = req.query

        const query = mood ? { mood } : {}
        const songs  = await songModel.find(query)

        res.status(200).json({
            message:"songs fetched successfully",
            songs
        })
    } catch(err) {
        throw err
    }
}


module.exports = {uploadSong, getSongs}