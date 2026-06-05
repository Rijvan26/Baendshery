import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
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
   const [isSidebarOpen, setIsSidebarOpen] = useState(true)

   // Get current chat messages from Redux
   const currentMessages = currentChatId && chats[currentChatId]?.messages || []
   const chatHistory = Object.values(chats)

   useEffect(() => {
      chatHook.intialSocketConnection()
      // Load all chats on mount
      chatHook.handleLoadChats()
   }, [])

   console.log("Redux chats:", chats);


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
      // Just reset - user can type and send to create new chat
      setInputValue('')
   }

   const handleSelectChat = (chatId) => {
      dispatch(setCurrentChatId(chatId))
   }

   const handleDeleteChat = (e, chatId) => {
      e.stopPropagation()
      chatHook.handleDeleteChat(chatId)
      if (currentChatId === chatId) {
         dispatch(setCurrentChatId(null))
      }
   }

   return (
      <div className="flex h-screen bg-gray-900 text-gray-100">
         {/* Left Sidebar */}
         <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-950 border-r border-gray-700 flex flex-col transition-all duration-300 overflow-hidden`}>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-700">
               <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
               >
                  <span className="text-lg">+</span>
                  <span>New Chat</span>
               </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
               {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                     <p>No chats yet</p>
                  </div>
               ) : (
                  chatHistory.map(chatItem => (
                     <div
                        key={chatItem.id}
                        onClick={() => handleSelectChat(chatItem.id)}
                        className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group transition-colors ${
                           currentChatId === chatItem.id
                              ? 'bg-gray-700'
                              : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                     >
                        <span className="truncate text-sm">{chatItem.title}</span>
                        <button
                           onClick={(e) => handleDeleteChat(e, chatItem.id)}
                           className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                        >
                           ✕
                        </button>
                     </div>
                  ))
               )}
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-700 p-4 space-y-2">
               <div className="text-xs text-gray-500 px-3 py-2">
                  Logged in as: <span className="text-gray-300">{user?.name || 'User'}</span>
               </div>
               <button className="w-full px-3 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  Settings
               </button>
               <button className="w-full px-3 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  Logout
               </button>
            </div>
         </div>

         {/* Main Content Area */}
         <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="border-b border-gray-700 bg-gray-900 px-6 py-4 flex items-center gap-4">
               <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
               >
                  ☰
               </button>
               <h1 className="text-lg font-semibold">
                  {currentChatId && chats[currentChatId]?.title ? chats[currentChatId].title : 'Select a chat or create new'}
               </h1>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
               {currentMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                     <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2">Start a conversation</h2>
                        <p className="text-gray-400">Type your message below to begin chatting</p>
                     </div>
                  </div>
               ) : (
                  currentMessages.map((msg, index) => (
                     <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                     >
                        <div
                           className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                              msg.role === 'user'
                                 ? 'bg-blue-600 text-white'
                                 : 'bg-gray-800 text-gray-100'
                           }`}
                        >
                           <p className="text-sm">{msg.content}</p>
                        </div>
                     </div>
                  ))
               )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-700 bg-gray-900 p-6">
               <div className="max-w-full">
                  <div className="flex gap-3">
                     <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmitMessage(e)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 disabled:opacity-50"
                     />
                     <button
                        onClick={handleSubmitMessage}
                        disabled={isLoading}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {isLoading ? 'Sending...' : 'Send'}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Dashboard