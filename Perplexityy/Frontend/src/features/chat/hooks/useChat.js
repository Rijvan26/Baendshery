import {intialSocketConnection} from "../socket/chat.socket"
import {setChats, setIsLoading,setError,setCurrentChatId,createNewChats,addNewMessage,addMessages } from "../chat.slice"
import { sendMessage,getChats,getMessages,deleteChat } from "../socket/chat.service"
import { useDispatch, useSelector } from "react-redux"


export const useChat = () => {

const dispatch = useDispatch()
const currentChatId = useSelector(state => state.chat.currentChatId)

async function handelSendMessage ({message,chatId}) {
    try {
        dispatch(setIsLoading(true))
        
        const data = await sendMessage({message,chatId})
        const {chat, aiMessage} = data
        
        if(!chatId) {
            // Creating a new chat
            dispatch(createNewChats({
                chatId:chat._id || chat.id,
                title:chat.title
            }))
            chatId = chat._id || chat.id
        }
        
        // Add user message to existing or new chat
        dispatch(addNewMessage({
            chatId: chatId,
            content: message,
            role:"user"
        }))

        // Add AI response message
        if (aiMessage) {
            dispatch(addNewMessage ({
                chatId: chatId,
                content: aiMessage.message || aiMessage.content,
                role: aiMessage.role || "assistant"
            }))
        }
        
        dispatch(setCurrentChatId(chatId))
        dispatch(setIsLoading(false))
        
    } catch (error) {
        console.error("Error sending message:", error)
        dispatch(setError(error.message))
        dispatch(setIsLoading(false))
    }
}

async function handleLoadChats() {
    try {
        dispatch(setIsLoading(true))
        const data = await getChats()
        console.log("Chats loaded from backend:", data)
        dispatch(setChats(data))
        dispatch(setIsLoading(false))
    } catch (error) {
        console.error("Error loading chats:", error)
        dispatch(setError(error.message))
        dispatch(setIsLoading(false))
    }
}

async function handleLoadMessages(chatId) {
    try {
        dispatch(setIsLoading(true))
        const data = await getMessages(chatId)
        console.log("Messages loaded from backend:", data)
        
        // Ensure messages is an array and has correct structure
        let messagesArray = []
        if (Array.isArray(data)) {
            messagesArray = data
        } else if (data.messages && Array.isArray(data.messages)) {
            messagesArray = data.messages
        } else if (data.chat && Array.isArray(data.chat.messages)) {
            messagesArray = data.chat.messages
        }
        
        // Ensure each message has content and role fields
        messagesArray = messagesArray.map(msg => ({
            content: msg.content || msg.message || msg.text || '',
            role: msg.role || msg.sender || 'user'
        }))
        
        console.log("Formatted messages:", messagesArray)
        
        // Update the specific chat with its messages
        dispatch(addMessages({
            chatId: chatId,
            messages: messagesArray
        }))
        dispatch(setIsLoading(false))
        return data
    } catch (error) {
        console.error("Error loading messages:", error)
        dispatch(setError(error.message))
        dispatch(setIsLoading(false))
    }
}

async function handleDeleteChat(chatId) {
    try {
        dispatch(setIsLoading(true))
        await deleteChat(chatId)
        dispatch(setIsLoading(false))
    } catch (error) {
        console.error("Error deleting chat:", error)
        dispatch(setError(error.message))
        dispatch(setIsLoading(false))
    }
}

    return {
        intialSocketConnection,
        handelSendMessage,
        handleLoadChats,
        handleLoadMessages,
        handleDeleteChat
   
    }
    
}