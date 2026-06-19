import dotenv from "dotenv";
dotenv.config();

console.log("MISTRAL:", process.env.MISTRAL_API_KEY);
import app from "./src/app.js"
import http from "http"
import {initSocketServer} from "./src/socket/server.socket.js"
import dns from "node:dns"
import connectToDb from "./src/config/database.js"
dns.setServers(['1.1.1.1', '8.8.8.8'])

const httpServer = http.createServer(app)
initSocketServer(httpServer)
connectToDb()

httpServer.listen(3000, () => {
    console.log("server is running on port 3000")
})