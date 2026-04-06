import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


 export async function getFeed () {
    try{
        const response = await api.get("/api/post/feed")
        return response.data
    }catch(err) {
        return err
    }
}

export async function createPost (imageUrl, caption){

    const formData = new FormData()
    formData.append("image", imageUrl)
    formData.append("caption", caption)

    const response = await api.post("/api/post/", formData)

    return response.data
}

export async function likePost(postId) {
    try{
        const response = await api.post("/api/post/like/" + postId)
        return response.data
    } catch (err) {
        return err
    }
}

export async function unLikePost(postId) {
    try{
        const response = await api.post("/api/post/unlike/" + postId)
        return response.data
    } catch (err) {
        return err
    }
}