const songModel = require("../models/song.model")
const storageService = require("../services/storage.services")
const songServices = require("../services/song.services")
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
      artist: tags.artist || "Unknown Artist",
      url: songFile.url,
      image: posterFile ? posterFile.url : null,
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

        if (!mood) {
            return res.status(400).json({
                message: "Mood parameter is required",
                songs: []
            })
        }

        console.log(`Getting songs for mood: ${mood}`)

        // Fetch ONLY from JioSaavn API
        let songs = await songServices.getSongsByMood(mood)
        
        console.log(`Retrieved ${songs.length} songs from JioSaavn for mood: ${mood}`)
        
        // Map API response to match frontend expectations
        if (songs && songs.length > 0) {
            songs = songs.map(song => ({
                ...song,
                posterUrl: song.image // Map 'image' field to 'posterUrl' for frontend
            }))
        }

        res.status(200).json({
            message: "songs fetched successfully",
            songs: songs || []
        })
    } catch(err) {
        console.error("Error fetching songs:", err.message)
        res.status(500).json({
            message: "Error fetching songs",
            error: err.message,
            songs: []
        })
    }
}


module.exports = {uploadSong, getSongs}