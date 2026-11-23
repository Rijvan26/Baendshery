const app = require("./src/app")
const connectToDb = require("./src/config/database")
const mongoose = require("mongoose")
const dns = require("node:dns")
dns.setServers(['1.1.1.1', '8.8.8.8'])
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    },
})

connectToDb()

// Map to track online users: { [userId]: socketId }
const onlineUsers = {}

// Make io and onlineUsers accessible in controllers via req.app.get(...)
app.set("io", io)
app.set("onlineUsers", onlineUsers)

io.on("connection", (socket) => {
    console.log("a user connected with socket id:", socket.id)

    const userId = socket.handshake.query.userId
    if (userId && userId !== "undefined") {
        onlineUsers[userId] = socket.id
        console.log(`User logged in: ${userId} -> socket: ${socket.id}`)
    }

    console.log("Current online users:", onlineUsers)

    // Broadcast updated list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(onlineUsers))

    socket.on("disconnect", () => {
        console.log("a user disconnected:", socket.id)
        if (userId && onlineUsers[userId] === socket.id) {
            delete onlineUsers[userId]
            console.log(`User removed: ${userId}`)
        }
        console.log("Current online users:", onlineUsers)
        io.emit("getOnlineUsers", Object.keys(onlineUsers))
    })
})

server.listen(3000, () => {
    console.log("server is running on port 3000")
})
