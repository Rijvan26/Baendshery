import {createContext, context, useState} from 'react'
export const PostContext = createContext()


export function PostProvider({children}) {
    const [feed, setFeed] = useState(null)
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)


    return (
        <PostContext.Provider value={{feed,setFeed,post,setPost ,loading,setLoading}}>
            {children}
        </PostContext.Provider>
    )
}