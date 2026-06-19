import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const MobileSidebar = ({
   isOpen,
   onClose,
   chatHistory,
   currentChatId,
   onNewChat,
   onSelectChat,
   onDeleteChat,
}) => {
   return (
      <>
         {/* Overlay */}
         {isOpen && (
            <div 
               className="fixed inset-0 bg-black/50 lg:hidden z-40"
               onClick={onClose}
            />
         )}

         {/* Mobile Sidebar */}
         <div className={`fixed left-0 top-0 h-screen w-72 bg-white/5 backdrop-blur-xl border-r border-[#424845] lg:hidden transition-transform duration-300 z-50 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
         }`}>
            {/* Branding */}
            <div className="p-6 border-b border-[#424845]">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-[#baf600] flex items-center justify-center">
                     <span className="font-bold text-black text-lg">P</span>
                  </div>
                  <h1 className="text-2xl font-bold text-white">Perplexity</h1>
               </div>
               <Button 
                  onClick={() => {
                     onNewChat()
                     onClose()
                  }}
                  className="w-full bg-[#baf600] text-black hover:bg-[#9de500] font-semibold"
               >
                  <span className="text-lg mr-2">+</span> New Chat
               </Button>
            </div>

            {/* Chat History */}
            <ScrollArea className="flex-1 p-4">
               <div className="space-y-2">
                  {chatHistory.length === 0 ? (
                     <div className="flex items-center justify-center h-32 text-gray-500">
                        <p className="text-sm text-center">No chats yet. Start a new conversation!</p>
                     </div>
                  ) : (
                     chatHistory.map((chatItem) => (
                        <div
                           key={chatItem.id}
                           onClick={() => {
                              onSelectChat(chatItem.id)
                              onClose()
                           }}
                           className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group transition-all ${
                              currentChatId === chatItem.id
                                 ? 'bg-[#baf600]/20 border border-[#baf600]/50'
                                 : 'hover:bg-white/10 border border-transparent'
                           }`}
                        >
                           <span className="truncate text-sm text-gray-200">{chatItem.title || 'Untitled Chat'}</span>
                           <button
                              onClick={(e) => onDeleteChat(e, chatItem.id)}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all ml-2 flex-shrink-0 p-1.5 hover:bg-red-400/10 rounded-md"
                              title="Delete chat"
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>
                     ))
                  )}
               </div>
            </ScrollArea>
         </div>
      </>
   )
}

export default MobileSidebar
