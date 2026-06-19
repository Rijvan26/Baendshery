import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useChat } from "../hooks/useChat"
import { setCurrentChatId } from "../chat.slice"
import {
   ChatSidebar,
   MobileSidebar,
   ChatHeader,
   ChatMessages,
   ChatInput,
   DeleteChatDialog,
} from "../components"

const Dashboard = () => {
   const dispatch = useDispatch()
   const user = useSelector(state => state.auth.user)
   const chats = useSelector(state => state.chat.chats)
   const currentChatId = useSelector(state => state.chat.currentChatId)
   const isLoading = useSelector(state => state.chat.isLoading)
   const chatHook = useChat()
   
   const [inputValue, setInputValue] = useState('')
   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
   const [chatToDelete, setChatToDelete] = useState(null)

   // Get current chat messages from Redux
   const currentMessages = currentChatId && chats[currentChatId]?.messages || []
   const chatHistory = Object.values(chats)

   useEffect(() => {
      chatHook.intialSocketConnection()
      chatHook.handleLoadChats()
   }, [])

   const handleSubmitMessage = (event) => {
      event.preventDefault()
      const trimmedMessage = inputValue.trim()
      if (!trimmedMessage) return

      if (currentChatId) {
         chatHook.handelSendMessage({ message: trimmedMessage, chatId: currentChatId })
      } else {
         chatHook.handelSendMessage({ message: trimmedMessage, chatId: null })
      }
      setInputValue('')
   }

   const handleNewChat = () => {
      dispatch(setCurrentChatId(null))
      setInputValue('')
   }

   const handleSelectChat = async (chatId) => {
      dispatch(setCurrentChatId(chatId))
      await chatHook.handleLoadMessages(chatId)
   }

   const handleDeleteChat = (e, chatId) => {
      e.stopPropagation()
      setChatToDelete(chatId)
      setDeleteDialogOpen(true)
   }

   const confirmDeleteChat = () => {
      if (chatToDelete) {
         chatHook.handleDeleteChat(chatToDelete)
         if (currentChatId === chatToDelete) {
            dispatch(setCurrentChatId(null))
         }
         setDeleteDialogOpen(false)
         setChatToDelete(null)
      }
   }

   const currentChatTitle = currentChatId && chats[currentChatId]?.title 
      ? chats[currentChatId].title 
      : 'New Chat'

   return (
      <div className="min-h-screen bg-[#131313] relative overflow-hidden flex">
         {/* Grid Background */}
         <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
               backgroundImage: `
                  linear-gradient(#baf600 1px, transparent 1px),
                  linear-gradient(90deg, #baf600 1px, transparent 1px)
               `,
               backgroundSize: "50px 50px",
            }}
         />

         {/* Desktop Sidebar */}
         <ChatSidebar
            user={user}
            chatHistory={chatHistory}
            currentChatId={currentChatId}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
         />

         {/* Mobile Sidebar */}
         <MobileSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            chatHistory={chatHistory}
            currentChatId={currentChatId}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
         />

         {/* Main Content Area */}
         <div className="flex-1 flex flex-col relative z-10">
            {/* Header */}
            <ChatHeader
               isMobile={true}
               chatTitle={currentChatTitle}
               onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* Messages */}
            <ChatMessages
               messages={currentMessages}
               isLoading={isLoading}
            />

            {/* Input */}
            <ChatInput
               inputValue={inputValue}
               onInputChange={(e) => setInputValue(e.target.value)}
               onSubmit={handleSubmitMessage}
               isLoading={isLoading}
               onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmitMessage(e)}
            />
         </div>

         {/* Delete Dialog */}
         <DeleteChatDialog
            isOpen={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={confirmDeleteChat}
         />
      </div>
   )
}

export default Dashboard