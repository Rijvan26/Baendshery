const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://localhost:5173"]
    // origin:"https://rizzzgram.onrender.com"
}))

// require routes

const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.route")
const messageRouter = require("./routes/message.route")
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/users", userRouter)
app.use("/api/message", messageRouter)

module.exports = app