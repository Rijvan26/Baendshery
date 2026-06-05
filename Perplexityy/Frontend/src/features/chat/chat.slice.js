import {createSlice} from "@reduxjs/toolkit"


const chatSlice = createSlice({
    name: "chat",
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:"false",
        error:null
    },
    reducers:{
        createNewChats:(state,action) => {
            const {chatId,title} = action.payload
            state.chats[chatId] = {
                id:chatId,
                title,
                messages:[],
                lastUpdateAt:new Date().toISOString(),
            }
        },
        addNewMessage:(state,action) => {
              const {chatId,conetent ,role} = action.payload
              if (!state.chats[chatId]) {
                  state.chats[chatId] = {
                      messages: []
                  }
              }
              state.chats[chatId].messages.push({content: conetent, role})
        },

        addMessages:(state,action) => {
            const {chatId,messages} = action.payload
            state.chats[chatId].messages.push(...messages)
        },
        
        setChats:(state,action) => {
            // Convert array of chats to object keyed by ID
            if (Array.isArray(action.payload)) {
                state.chats = action.payload.reduce((acc, chat) => {
                    acc[chat._id || chat.id] = chat
                    return acc
                }, {})
            } else {
                state.chats = action.payload
            }
        },
         setCurrentChatId:(state,action) => {
            state.currentChatId = action.payload
        },
         setIsLoading:(state,action) => {
            state.isLoading = action.payload
        },
        setError:(state,action) => {
            state.error = action.payload
        }

    }

})

export const {setChats,setCurrentChatId,setIsLoading, setError,createNewChats,addNewMessage,addMessages} = chatSlice.actions
export default chatSlice.reducer