const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()
const cors = require("cors")
const path = require("path")
app.use(express.json())
app.use(express.static("./public"))
app.use(cors())

app.post("/notes",async (req,res) => {

    const {title, description} = req.body

    const note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message:"note created successfully",
        note
    })
})

app.get("/get/notes", async (req,res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

app.delete("/notes/:noteid", async (req,res) => {
    const noteId = req.params.noteid

 const denote =  await noteModel.findByIdAndDelete(noteId)

    res.status(200).json({
        message:"note deleted successfully",
        denote
    })


})

app.patch("/notes/:id", async (req,res) => {
    const noteId = req.params.id
    const {description} = req.body
  const upnote =   await noteModel.findByIdAndUpdate(noteId,{description})

    res.status(200).json({
        message:"updated successfully",
        upnote
    })
})


app.use('*name',(req,res)=> {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app