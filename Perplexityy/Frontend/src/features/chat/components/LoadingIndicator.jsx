import React from 'react'

const LoadingIndicator = () => {
   return (
      <div className="flex justify-start">
         <div className="bg-white/10 text-gray-100 max-w-2xl px-4 py-3 rounded-xl">
            <div className="flex gap-2 items-center">
               <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#baf600] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-2 h-2 bg-[#baf600] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-2 h-2 bg-[#baf600] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
               </div>
               <span className="text-sm text-gray-400">AI is thinking...</span>
            </div>
         </div>
      </div>
   )
}

export default LoadingIndicator
