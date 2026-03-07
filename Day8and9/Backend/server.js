const app = require("./src/app")
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
require("dotenv").config()
const mongoose = require("mongoose")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000,() => {
    console.log("server is running on port 3000");
    
})