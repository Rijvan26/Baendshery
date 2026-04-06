
import React, { useContext } from 'react'
import {getFeed, likePost, unLikePost, createPost} from "../services/post.api"
import { PostContext } from '../post.context'


const usePost = () => {
    const context = useContext(PostContext)
    const {feed,setFeed, setPost, post,loading , setLoading} = context

    const handleGetFeed = async() => {
        setLoading(true)
         const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)

    }

    
        const handleCreatePost = async (imageUrl, caption) =>  {
               setLoading(true)
              const data = await createPost(imageUrl, caption)
              setFeed(prev => [...feed, data.post])
             await handleGetFeed()
               setLoading(false)
        }

    const handleLikePost = async (post) => {
           setLoading(true)
           const data = await likePost(post)
           await handleGetFeed()
           setLoading(false)
    }

     const handleUnLikePost = async (post) => {
           setLoading(true)
           const data = await unLikePost(post)
           await handleGetFeed()
           setLoading(false)
    }
    
  return {handleGetFeed,feed,loading,handleCreatePost, handleLikePost , handleUnLikePost}
}

export default usePost