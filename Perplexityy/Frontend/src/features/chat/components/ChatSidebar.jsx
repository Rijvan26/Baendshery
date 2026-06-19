import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const ChatSidebar = ({
   user,
   chatHistory,
   currentChatId,
   onNewChat,
   onSelectChat,
   onDeleteChat,
}) => {
   return (
      <div className="hidden lg:flex flex-col w-80 bg-white/5 backdrop-blur-xl border-r border-[#424845] shadow-[0_0_40px_rgba(186,246,0,0.08)] relative z-20">
         {/* Branding */}
         <div className="p-6 border-b border-[#424845]">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-lg bg-[#baf600] flex items-center justify-center">
                  <span className="font-bold text-black text-lg">XI</span>
               </div>
               <h1 className="text-2xl font-bold text-white">Intellexx</h1>
            </div>
            <Button 
               onClick={onNewChat}
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
                        onClick={() => onSelectChat(chatItem.id)}
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
                        > <i class="ri-delete-bin-line"></i>
                           {/* <Trash2 size={16} /> */}
                        </button>
                     </div>
                  ))
               )}
            </div>
         </ScrollArea>

         {/* User Info */}
         <div className="border-t border-[#424845] p-4 space-y-3">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
               <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-[#baf600] text-black font-bold">
                     {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
               </Avatar>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.name || 'Guest'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
               </div>
            </div>
            <Button variant="outline" className="w-full text-gray-500 border-[#424845] hover:bg-white/5 text-sm">
               Settings
            </Button>
            <Button variant="outline" className="w-full text-gray-500 border-[#424845] hover:bg-white/5 text-sm">
               Logout
            </Button>
         </div>
      </div>
   )
}

export default ChatSidebar
