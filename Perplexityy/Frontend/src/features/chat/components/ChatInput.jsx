import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ChatInput = ({
   inputValue,
   onInputChange,
   onSubmit,
   isLoading,
   onKeyPress,
}) => {
   return (
      <div className="border-t border-[#424845] bg-white/5 backdrop-blur-xl p-6">
         <div className="max-w-4xl mx-auto">
            <form onSubmit={onSubmit} className="flex gap-3 items-center">
               <Input
                  type="text"
                  value={inputValue}
                  onChange={onInputChange}
                  onKeyPress={onKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border-[#424845] text-white placeholder-gray-500 focus:border-[#baf600] focus:ring-[#baf600]/50 disabled:opacity-50"
               />
               <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#baf600] text-black hover:bg-[#9de500] px-6 font-semibold"
               >
                  {isLoading ? '...' : <i class="ri-send-ins-line text-gray-900"></i>}
               </Button>
            </form>
         </div>
      </div>
   )
}

export default ChatInput
