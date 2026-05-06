const app = require("./src/app")
const connectToDb = require("./src/config/database")
const mongoose = require("mongoose")
const dns = require("node:dns")
dns.setServers(['1.1.1.1', '8.8.8.8'])



connectToDb ()
app.listen(3000, () => {
    console.log("server is running on port 3000")
})