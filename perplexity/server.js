import dotenv from "dotenv"
import app from "./src/app.js"
import dns from "node:dns"
import connectToDb from "./src/config/database.js"
    dotenv.config()
dns.setServers(['1.1.1.1', '8.8.8.8'])

connectToDb()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})