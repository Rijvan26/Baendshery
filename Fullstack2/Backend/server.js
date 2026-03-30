require("dotenv").config()
const app = require("./src/app")
const connecToDb = require("./src/config/database")
const dns = require("node:dns")
dns.setServers(['1.1.1.1','8.8.8.8'])

connecToDb()

app.listen(3000,() => {
    console.log("server is running on port 3000")
})