import { io } from "socket.io-client";
import store from "../../../app/app.store";
import { addNewMessage, setIsLoading } from "../chat.slice";

let socket = null;

export const intialSocketConnection = () => {
    if (socket) return socket;

    socket = io("https://perplexityy.onrender.com", {
        withCredentials: true,
    })

    socket.on("connect", () => {
       console.log("connected to socket server")
    })

    socket.on("messageResponse", (data) => {
        console.log("Received message:", data)
        const state = store.getState();
        const currentChatId = state.chat.currentChatId;
        
        if (currentChatId) {
            // Add AI response message
            store.dispatch(addNewMessage({
                chatId: currentChatId,
                conetent: data.content || data.message,
                role: data.role || "assistant"
            }))
        }
        store.dispatch(setIsLoading(false))
    })

    socket.on("error", (error) => {
        console.error("Socket error:", error)
        store.dispatch(setIsLoading(false))
    })

    socket.on("disconnect", () => {
        console.log("Disconnected from socket server")
    })

    return socket;
}

