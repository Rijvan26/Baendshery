import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})
export async function register (username, email,password,bio,profilePic) {
      
    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("bio", bio)
    if(profilePic) {
        formData.append("profilePic", profilePic)
    }
    try{
        const response = await api.post("/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    return response.data

    } catch(err) {
        throw err
    }
       


}


export async function login (username,password) {

    try{
        const response = await api.post("/login", {
            username,
            password
        },
    )

    return response.data

    } catch(err) {
        throw err
    }

}

export async function getMe () {
    try{
        const response = await api.get("/get-me")
        return response.data
    }catch(err){
        throw err
    }
}

export async function logout () {
    try{
        const response = await api.post("/logout")
        return response.data
    }catch(err){
        throw err
    } 
}

export async function suggestion () {
    try {
        const response = await api.get("/suggestion")
        return response.data
    } catch (err) {
        throw err
    }
}