import {Router} from "express"
import { deleteMessage, getChats, getMessages, sendMessages } from "../controllers/chat.controller.js"
import authUser from "../middleware/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message", authUser, sendMessages )
chatRouter.get("/", authUser, getChats)
chatRouter.get("/:chatId/messages", authUser, getMessages)
chatRouter.delete("/delete/:chatId",authUser, deleteMessage)


export default chatRouter 