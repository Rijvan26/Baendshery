import { response } from "express"
import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {genrateResponse, generateChatTitle} from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import userModel from "../models/user.model.js"

export async function sendMessages (req,res) {
    const {message, chat:chatId} = req.body

    let chat = null, title = null;
    if(!chatId) {
     title = await generateChatTitle(message)
      chat = await chatModel.create({
        user: req.user.id,
        title
    })
        
    }

    const messages = (await chatModel.find({chat:chatId})).sort({createdAt: 1})
    const result = await genrateResponse(message)




    const userMessage = await messageModel.create({
        chat: chat.id,
        content:message,
        role:"user"
    })

    const aiMessage = await messageModel.create({
        chat : chat.id,
        content:result,
        role:"ai"
    })
    res.json({
        response:result,
        title,
        chat,
        aiMessage
    })
}

