import "../style/feed.scss"
import Post from "../components/Post"
import { usePost } from "../hook/usePost"
import { useEffect } from "react"
import Navbar from "../../shared/components/Navbar"
import { useAuth } from "../../auth/hooks/userAuth"
import SuggestedUsers from "../../shared/components/SuggestedUsers"
import Sidebar from "../../shared/components/Sidebar"

const Feed = () => {

    const {user, handleSuggestion,suggestedUsers} = useAuth()
    const {feed, handleGetFeed,loading,actionLoading, handleLikePost, handleUnLikePost, handleFollowUser, handleUnFollowUser } = usePost()

    useEffect(  () => {
         handleGetFeed()
    },[])

    useEffect( () => {
        if(user && suggestedUsers.length === 0){
            handleSuggestion()
        } 
    },[user])

    if(loading || !feed) {
        return (
            <main><h1>Loading....</h1></main>
        )
    }

    if(actionLoading) {
        return (
            <main><h1>Loading....</h1></main>
            
        )
    }
    console.log(feed)
    return (
           <main>
            <div className="sidebar">
             <Sidebar user={user}/>
            </div>
            <div className="rightbar">
                        <SuggestedUsers users={suggestedUsers} />
            </div>
            <div className="feed">
                <div className="posts">
                    {
                      feed?.length > 0 &&  feed.map(post => {
                            return  <Post key={post?._id} user={post?.user} post={post} 
                                        loading={loading} handleLikePost={handleLikePost} handleUnLikePost={handleUnLikePost}
                                            handleFollowUser={handleFollowUser} handleUnFollowUser={handleUnFollowUser}
                                       />
                        })
                    }
                </div>
            </div>
           </main>
    )
}


export default Feed