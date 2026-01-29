const express = require("express")

const app = express()

app.get('/', (req,res) => {
    res.send("hello bhai")
})

app.get('/about', (req,res) => {
    res.send("hello bhai ye about hai")
})
app.listen(3000)