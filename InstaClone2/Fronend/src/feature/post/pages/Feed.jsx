import React,{useEffect} from 'react'
import Post from "../components/Post"
import "../styles/feed.scss"
import usePost from '../hooks/usePost'
import Navbar from '../../shared/components/Navbar'


const Feed = () => {
    const {feed,handleGetFeed,loading, handleLikePost, handleUnLikePost} = usePost()

     useEffect(() => {
        handleGetFeed()

    }
    ,[])
     console.log(feed)

    if(!feed || loading) {
       return <main><h1>Loading..</h1></main>
    }
  return (
    <main>
        <Navbar />
        <div className="feed"> 
            <div className="posts">
                {
                   feed?.length > 0 && feed.map(post => {
                        return (
                        <Post key={post._id} hello={"hello"} user={post.user} post={post}
                        loading={loading} handleGetFeed={handleGetFeed} handleLikePost={handleLikePost}
                        handleUnLikePost={handleUnLikePost} />)
                    })
                }
            </div>
        </div>
    </main>
  )
}

export default Feed