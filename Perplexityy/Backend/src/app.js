import express from "express"
import authRouter from "./routes/auth.route.js"
import chatRouter from "./routes/chat.route.js"
import cookieParser from "cookie-parser"
import morgan from 'morgan'
import cors from "cors"
const app = express()
app.use(cors({
    origin:"https://perplexity-phi-mauve.vercel.app",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use("/api/auth", authRouter)
app.use("/api/chats", chatRouter)
export default app