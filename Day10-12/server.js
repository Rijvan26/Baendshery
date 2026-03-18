require('dotenv').config()
const app = require("./src/app")
const dns = require("node:dns")
dns.setServers(['1.1.1.1', '8.8.8.8']);
const mongoose = require("mongoose")
const connectToDb = require("./src/config/database")
connectToDb()

app.listen(3000, () => {
    console.log("server is runnin on port 3000")
})