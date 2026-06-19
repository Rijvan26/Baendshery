import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import MessageBubble from './MessageBubble'
import LoadingIndicator from './LoadingIndicator'

const ChatMessages = ({ messages, isLoading }) => {
   return (
      <ScrollArea className="flex-1 p-6">
         {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
               <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-3">Start a Conversation</h2>
                  <p className="text-gray-400 text-lg">Ask me anything and I'll help you find answers</p>
               </div>
            </div>
         ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
               {messages.map((msg, index) => (
                  <MessageBubble key={index} message={msg} />
               ))}
               
               {isLoading && <LoadingIndicator />}
            </div>
         )}
      </ScrollArea>
   )
}

export default ChatMessages
