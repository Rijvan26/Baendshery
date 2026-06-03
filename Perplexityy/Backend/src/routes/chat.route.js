import {Router} from "express"
import { sendMessages } from "../controllers/chat.controller.js"
import authUser from "../middleware/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message", authUser, sendMessages )


export default chatRouter