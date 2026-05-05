import { getFeed, createPost,likePost,unLikePost,getPosts,followUser,unFollowUser } from "../services/post.api";
import { useContext,useEffect } from "react";
import { PostContext } from "../post.context";


export const usePost = () => {
    const context  = useContext(PostContext)
    const {loading,actionLoading, setActionLoading ,setLoading,post, setPost,feed, setFeed} = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost  = async (imageFile, caption) =>  {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed(...feed, data.post)
        setLoading(false)
    }

    const handleLikePost = async (postId) => {
        setActionLoading(true)
        const data = await likePost(postId)
        await handleGetFeed()
       
        setActionLoading(false)


    }


 const handleUnLikePost = async (postId) => {
        setActionLoading(true)
        const data = await unLikePost(postId)
       
        await handleGetFeed()
        setActionLoading(false)

    }


    const handleGetPosts = async () => {
        setActionLoading(true)
        const data = await getPosts()
        setPost(data.posts)
        setActionLoading(false)
    }


    const handleFollowUser = async (username) => {
        setActionLoading(true)
        const data = await followUser(username)
        setFeed(prev =>
        prev.map(post =>
            post.user.username === username
                ? { ...post, isFollowing: true }
                : post
        )
    )
        // await handleGetFeed()
        setActionLoading(false) 
    }


    const handleUnFollowUser = async (username) => {
        setActionLoading(true)
        const data = await unFollowUser(username)
        
        setFeed(prev =>
        prev.map(post =>
            post.user.username === username
                ? { ...post, isFollowing: false }
                : post
        )
    )
        // await handleGetFeed()
        setActionLoading(false)
    }
    

    return {loading,feed,post,handleGetFeed , handleCreatePost ,
        handleLikePost, handleUnLikePost, handleGetPosts, handleFollowUser, handleUnFollowUser}
}