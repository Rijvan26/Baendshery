import React from 'react'
import ReactMarkdown from 'react-markdown'

const MessageBubble = ({ message }) => {
   const isUserMessage = message.role === 'user'

   return (
      <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
         <div
            className={`max-w-2xl px-4 py-3 rounded-xl ${
               isUserMessage
                  ? 'bg-[#baf600] text-black'
                  : 'bg-white/10 text-gray-100'
            }`}
         >
            <div className="text-sm prose prose-invert max-w-none dark">
               <ReactMarkdown
                  components={{
                     p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                     ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                     ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                     li: ({node, ...props}) => <li className="mb-1" {...props} />,
                     code: ({node, ...props}) => <code className={`${isUserMessage ? 'bg-black/20' : 'bg-black/40'} px-2 py-1 rounded text-gray-200`} {...props} />,
                     pre: ({node, ...props}) => <pre className={`${isUserMessage ? 'bg-black/20' : 'bg-black/40'} p-3 rounded mb-2 overflow-x-auto`} {...props} />,
                     h1: ({node, ...props}) => <h1 className="font-bold text-lg mb-2" {...props} />,
                     h2: ({node, ...props}) => <h2 className="font-bold text-base mb-2" {...props} />,
                     h3: ({node, ...props}) => <h3 className="font-bold text-sm mb-2" {...props} />,
                     blockquote: ({node, ...props}) => <blockquote className={`border-l-4 ${isUserMessage ? 'border-black/40' : 'border-gray-500'} pl-3 italic mb-2`} {...props} />,
                     a: ({node, ...props}) => <a className={`${isUserMessage ? 'text-black underline' : 'text-[#baf600] hover:underline'}`} {...props} />,
                  }}
               >
                  {message.content}
               </ReactMarkdown>
            </div>
         </div>
      </div>
   )
}

export default MessageBubble
