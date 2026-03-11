require("dotenv").config()
const app = require("./src/app")
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const mongoose = require("mongoose")
const connectToDB = require("./src/config/database")

connectToDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server running on port", PORT)
})