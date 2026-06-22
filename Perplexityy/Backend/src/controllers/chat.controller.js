import { response } from "express"
import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {genrateResponse, generateChatTitle} from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import userModel from "../models/user.model.js"

export async function sendMessages (req,res) {
    const {message, chatId} = req.body

    
    let chat = null, title = null;
    if(!chatId) {
     title = await generateChatTitle(message)
      chat = await chatModel.create({
        user: req.user.id,
        title
    })
        
    }

    const userMessage = await messageModel.create({
        chat: chatId ||chat.id,
        content:message,
        role:"user"
    })


    const messages = await messageModel.find({chat:chatId || chat.id}).sort({createdAt:-1}).limit(15)

    const history = await messages.map(msg => (
         {
            role: msg.role === "ai" ? "assistent" : "user",
            content:msg.content
        }
    ))
    const result = await genrateResponse(message,history)

    
    const aiMessage = await messageModel.create({
        chat :chatId ||  chat.id,
        content:result,
        role:"assistent"
    })
    res.json({
        response:result,
        title,
        chat,
        aiMessage
    })
}

export async function getChats(req,res) {
    const user = req.user

    const chats = await chatModel.find({user:user.id})

    res.status(200).json({
        message:"chat fetched successfully",
        chats
    })
}

export async function getMessages(req,res) {
    const {chatId} = req.params

    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id

    })

    if(!chat){
        return res.status(400).json({
            message:"chat not found"
        })
    }

    const messages = await messageModel.find({
        chat:chatId
    })

    res.status(200).json({
        message:"messagge fetched successfully",
        messages
    })
}


export async function deleteMessage(req,res) {
    const {chatId} = req.params

    const chat = await chatModel.findOneAndDelete({
        _id:chatId,
        user:req.user.id
    })

    await messageModel.deleteMany({
        chat:chatId
    })

    if(!chat) {
        return res.status(404).json({
            message:"chat not found "
        })
    }

    res.status(200).json({
        message:"message delete successfully"
    })
}