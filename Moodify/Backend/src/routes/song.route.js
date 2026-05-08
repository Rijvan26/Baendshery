const express = require("express")
const songController = require("../controllers/song.controller")
const upload = require("../middleware/upload.middleware")
const songRouter = express.Router()


//  *POST /api/songs/
// songRouter.post("/upload",upload.single("song"), songController.uploadSong  )
songRouter.post("/upload", (req, res) => {
  upload.single("song")(req, res, function (err) {
    console.log("FILE:", req.file)
    console.log("BODY:", req.body)
    console.log("ERROR:", err)

    if (err) {
      return res.status(400).json({ error: err.message })
    }

    if (!req.file) {
      return res.status(400).json({ error: "File not received" })
    }

    songController.uploadSong(req, res)
  })
})

songRouter.get("/get-songs", songController.getSongs)

module.exports = songRouter