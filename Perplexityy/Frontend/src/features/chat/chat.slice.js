import {createSlice} from "@reduxjs/toolkit"


const chatSlice = createSlice({
    name: "chat",
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
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
              const {chatId,content ,role} = action.payload
              if (!state.chats[chatId]) {
                  state.chats[chatId] = {
                      messages: []
                  }
              }
              state.chats[chatId].messages.push({content: content, role})
        },

        addMessages:(state,action) => {
            const {chatId,messages} = action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = {
                    messages: []
                }
            }
            // Replace messages completely instead of appending
            state.chats[chatId].messages = messages || []
        },
        
      setChats: (state, action) => {
    const payload = action.payload
    console.log("setChats payload:", payload)
    
    let chatsArray = []
    
    // Handle different backend response formats
    if (Array.isArray(payload)) {
        // Response is directly an array
        chatsArray = payload
    } else if (payload && typeof payload === 'object') {
        // Response is an object - check if it has a chats property
        if (Array.isArray(payload.chats)) {
            chatsArray = payload.chats
        } else if (Array.isArray(payload.data)) {
            chatsArray = payload.data
        } else if (payload.chat && Array.isArray(payload.chat)) {
            chatsArray = payload.chat
        }
    }
    
    // Convert array to object keyed by ID
    if (chatsArray.length > 0) {
        state.chats = chatsArray.reduce((acc, chat) => {
            const chatId = chat._id || chat.id
            if (!chatId) {
                console.warn("Chat missing ID:", chat)
                return acc
            }

            acc[chatId] = {
                id: chatId,
                title: chat.title || 'Untitled',
                messages: chat.messages || [],
                lastUpdatedAt: chat.updatedAt || new Date().toISOString(),
            }
            console.log("Added chat to state:", chatId, acc[chatId])

            return acc
        }, {})
    } else {
        console.warn("No chats array found in payload")
        state.chats = {}
    }
    
    console.log("Final chats state:", state.chats)
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