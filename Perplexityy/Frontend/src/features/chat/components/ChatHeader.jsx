import React from 'react'

const ChatHeader = ({
   isMobile,
   chatTitle,
   onMenuClick,
}) => {
   if (isMobile) {
      return (
         <div className="lg:hidden border-b border-[#424845] bg-white/5 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
            <button
               onClick={onMenuClick}
               className="text-gray-300 hover:text-white text-xl"
            >
               ☰
            </button>
            <h1 className="text-lg font-semibold text-white truncate">
               {chatTitle}
            </h1>
         </div>
      )
   }

   return (
      <div className="hidden lg:flex border-b border-[#424845] bg-white/5 backdrop-blur-xl px-6 py-4 items-center justify-between">
         <h1 className="text-xl font-semibold text-white">
            {chatTitle}
         </h1>
      </div>
   )
}

export default ChatHeader
