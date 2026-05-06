import axios from "axios"


const api = axios.create({
    baseURL: "https://baendshery-3.onrender.com",
    withCredentials:true
}    
)

export async function getFeed () {
    const response = await api.get("/api/post/feed")
    return response.data
}

export async function createPost (imageFile, caption) {

    // this is the way to send file data in axios
    const formData = new FormData()
    // use same name as multer
    formData.append("image", imageFile)
    formData.append("caption", caption)
    const response = await api.post("/api/post",formData )

    return response.data
}

export async function getPosts () {
    const response = await api.get("/api/post")
    return response.data
}

export async function likePost (postId) {
    const response = await api.post("/api/post/like/" + postId)

    return response.data
}



export async function unLikePost (postId) {
    const response = await api.post("/api/post/unLike/" + postId)

    return response.data
}

export async function followUser (username) {
    const response = await api.post("/api/users/follow/" + username)

    return response.data
}

export async function unFollowUser (username) {
    const response = await api.post("/api/users/unfollow/" + username) 
    return response.data 
}
