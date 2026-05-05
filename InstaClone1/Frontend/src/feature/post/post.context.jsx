import { createContext,useState } from "react";

export const PostContext = createContext()

export const PostContextProvider = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)
    const [post, setPost] = useState(null)
    const [feed, setFeed] = useState(null)
    const [suggestedUsers, setsuggestedUsers] = useState([])

    return (
       <PostContext.Provider value={{loading ,actionLoading, setActionLoading,setLoading,post, setPost,feed, setFeed,suggestedUsers, setsuggestedUsers}} >
        {children}
       </PostContext.Provider>
    )
}