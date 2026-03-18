require("dotenv").config()
const dns = require("node:dns")
dns.setServers(['1.1.1.1', '8.8.8.8'])
const app = require("./src/app")
const mongoose = require("mongoose")
const connetToDb = require("./src/config/database")
connetToDb()

app.listen(3000, (req,res) => {
    console.log("server running on port 3000")
})