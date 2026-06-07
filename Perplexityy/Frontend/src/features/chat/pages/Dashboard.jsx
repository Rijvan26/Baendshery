import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import ReactMarkdown from 'react-markdown'
import { useChat } from "../hooks/useChat"
import { setCurrentChatId } from "../chat.slice"

const Dashboard = () => {
   const dispatch = useDispatch()
   const user = useSelector(state => state.auth.user)
   const chats = useSelector(state => state.chat.chats)
   const currentChatId = useSelector(state => state.chat.currentChatId)
   const isLoading = useSelector(state => state.chat.isLoading)
   const chatHook = useChat()
   
   const [inputValue, setInputValue] = useState('')
   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768)

   // Get current chat messages from Redux
   const currentMessages = currentChatId && chats[currentChatId]?.messages || []
   const chatHistory = Object.values(chats)

  

   useEffect(() => {
      chatHook.intialSocketConnection()
      // Load all chats on mount
      chatHook.handleLoadChats()
   }, [])

   // Auto-select first chat when chats are loaded
   // useEffect(() => {
   //    console.log("Auto-select effect - chatHistory length:", chatHistory.length, "currentChatId:", currentChatId)
   //    if (chatHistory.length > 0 && !currentChatId) {
   //       const firstChat = chatHistory[0]
   //       const firstChatId = firstChat?.id
   //       console.log("First chat object:", firstChat)
   //       console.log("First chat ID:", firstChatId)
         
   //       if (firstChatId) {
   //          console.log("Auto-selecting first chat:", firstChatId)
   //          dispatch(setCurrentChatId(firstChatId))
   //       } else {
   //          console.warn("First chat has no ID!")
   //       }
   //    }
   // }, [chatHistory.length, currentChatId, dispatch])

   // Load messages when chat is selected (only when currentChatId changes and is not null)
   // useEffect(() => {
   //    if (currentChatId && chatHistory.length > 0) {
   //       console.log("Loading messages for chat:", currentChatId)
   //       // Get the chat object to verify it exists
   //       const selectedChat = chats[currentChatId]
   //       console.log("Selected chat object:", selectedChat)
         
   //       if (selectedChat) {
   //          chatHook.handleLoadMessages(currentChatId)
   //       } else {
   //          console.warn("Chat not found in state for ID:", currentChatId)
   //       }
   //    }
   // }, [currentChatId])


   const handleSubmitMessage = (event) => {
      event.preventDefault()

      const trimmedMessage = inputValue.trim()
      if (!trimmedMessage) {
         return
      }

      if (currentChatId) {
         // Send to existing chat
         chatHook.handelSendMessage({ message: trimmedMessage, chatId: currentChatId })
      } else {
         // Create new chat with this message
         chatHook.handelSendMessage({ message: trimmedMessage, chatId: null })
      }
      setInputValue('')
   }

   const handleNewChat = () => {
      // Reset to create a new chat
      dispatch(setCurrentChatId(null))
      setInputValue('')
   }

   const handleSelectChat = async (chatId) => {
      console.log("hello")
      dispatch(setCurrentChatId(chatId))
    await  chatHook.handleLoadMessages(chatId)
   }

   const handleDeleteChat = (e, chatId) => {
      e.stopPropagation()
      chatHook.handleDeleteChat(chatId)
      if (currentChatId === chatId) {
         dispatch(setCurrentChatId(null))
      }
   }

   return (
      <div className="flex h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-gray-100">
         {/* Left Sidebar */}
         <div className={`${isSidebarOpen ? 'w-48 sm:w-64' : 'w-0'} bg-gray-950/90 backdrop-blur-md border-r border-gray-700 flex flex-col transition-all duration-300 overflow-hidden fixed md:relative h-full z-40 md:z-auto`}>
            {/* Sidebar Header */}
            <div className="p-3 sm:p-4 border-b border-gray-700 ">
               <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm sm:text-base"
               >
                  <span className="text-lg">+</span>
                  <span className="hidden sm:inline">New Chat</span>
               </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 hidescrollbar">
               {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                     <p className="text-xs sm:text-sm">No chats yet</p>
                  </div>
               ) : (
                  chatHistory.map((chatItem, idx) => {
                     console.log(`Chat ${idx}:`, chatItem)
                     return (
                        <div
                           key={chatItem.id || idx}
                           onClick={() => handleSelectChat(chatItem.id)}
                           className={`p-2 sm:p-3 rounded-lg cursor-pointer flex justify-between items-center group transition-colors ${
                              currentChatId === chatItem.id
                                 ? 'bg-gray-700'
                                 : 'bg-gray-800 hover:bg-gray-700'
                           }`}
                        >
                           <span className="truncate text-xs sm:text-sm">{chatItem.title || 'Untitled Chat'}</span>
                           <button
                              onClick={(e) => handleDeleteChat(e, chatItem.id)}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all flex-shrink-0 ml-2"
                           >
                              ✕
                           </button>
                        </div>
                     )
                  })
               )}
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-700 p-2 sm:p-4 space-y-2">
               <div className="text-xs text-gray-500 px-2 sm:px-3 py-2 truncate">
                  Logged in as: <span className="text-gray-300 hidden sm:inline">{user?.name || 'guest'}</span>
                  <span className="text-gray-300 sm:hidden">{user?.name?.charAt(0) || 'G'}</span>
               </div>
               <button className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  <span className="hidden sm:inline">Settings</span>
                  <span className="sm:hidden">⚙️</span>
               </button>
               <button className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">🚪</span>
               </button>
            </div>
         </div>

         {/* Main Content Area */}
         <div className="flex-1 flex flex-col w-full md:w-auto">
            {/* Top Bar */}
            <div className="border-b border-gray-700/50 bg-black/40 backdrop-blur-md px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
               <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden text-gray-400 hover:text-gray-200 transition-colors text-xl"
               >
                  ☰
               </button>
               <h1 className="text-sm sm:text-lg font-semibold truncate">
                  {currentChatId && chats[currentChatId]?.title ? chats[currentChatId].title : 'Select a chat or create new'}
               </h1>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 hidescrollbar bg-black/20 backdrop-blur-sm">
               {currentMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                     <div className="text-center px-4">
                        <h2 className="text-xl sm:text-3xl font-bold mb-2">Start a conversation</h2>
                        <p className="text-gray-300 text-sm sm:text-base">Type your message below to begin chatting</p>
                     </div>
                  </div>
               ) : (
                  currentMessages.map((msg, index) => (
                     <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                     >
                        <div
                           className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                              msg.role === 'user'
                                 ? 'bg-blue-600/90 text-white'
                                 : 'bg-gray-800/90 text-gray-100'
                           }`}
                        >
                           <div className="text-sm prose prose-invert max-w-none dark">
                              <ReactMarkdown
                                 components={{
                                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                    code: ({node, ...props}) => <code className="bg-gray-900 px-2 py-1 rounded text-gray-200" {...props} />,
                                    pre: ({node, ...props}) => <pre className="bg-gray-900 p-3 rounded mb-2 overflow-x-auto" {...props} />,
                                    h1: ({node, ...props}) => <h1 className="font-bold text-lg mb-2" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="font-bold text-base mb-2" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="font-bold text-sm mb-2" {...props} />,
                                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-500 pl-3 italic mb-2" {...props} />,
                                    a: ({node, ...props}) => <a className="text-blue-400 hover:underline" {...props} />,
                                 }}
                              >
                                 {msg.content}
                              </ReactMarkdown>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-700/50 bg-black/40 backdrop-blur-md p-3 sm:p-6">
               <div className="max-w-full">
                  <div className="flex gap-2 sm:gap-3">
                     <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmitMessage(e)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/90 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 disabled:opacity-50 text-sm sm:text-base"
                     />
                     <button
                        onClick={handleSubmitMessage}
                        disabled={isLoading}
                        className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                     >
                        <span className="hidden sm:inline">{isLoading ? 'Sending...' : 'Send'}</span>
                        <span className="sm:hidden">{isLoading ? '...' : '⬆️'}</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Dashboard