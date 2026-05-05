import {useContext,useEffect} from "react"
import {AuthContext} from "../auth.context.jsx"
import {login,register,getMe,logout, suggestion} from "../services/auth.api.js"

export function useAuth() {
    const context = useContext(AuthContext)
    
       const {user, setUser ,loading , setLoading, error, setError, suggestedUsers, setsuggestedUsers   
        
       } = context
     const handleRegister = async (username,email,password,bio,profilePic) => {
            setLoading(true)
            try{
                const response = await register(username,email,password,bio,profilePic)
                   setUser(response.user)
                   return true /*indicate success to the caller*/
            }
         catch (err) {
            // this extract clean error message from the response or use a default message
            const message = err?.response?.data?.message || "Something went wrong"
            setError(message)
            console.log(err)
            return false /*indicate failure to the caller*/
        } finally{
            setLoading(false)
        }
    }

    const handleLogin = async (username,password) => {
        setLoading(true)
        try{
            const response = await login(username,password)
               setUser(response.user)
               return true /*indicate success to the caller*/
        }
     catch (err) {
        const message = err?.response?.data?.message || "Something went wrong"
        setError(message)
        console.log(err)
        return false /*indicate failure to the caller*/

    } finally{
        setLoading(false)
    }
}

  const handleGetMe = async () => {
    setLoading(true)   
    try{
        const response = await getMe()
           setUser(response.user)
    }   catch (err) {   
        if(err?.response?.status === 401) { // if unauthorized at first visit, clear user state and error
            setUser(null) // clear user state if unauthorized
            setError(null) // clear any existing errors
            return
        }
        const message = err?.response?.data?.message || "Something went wrong"
        setError(message)
        console.log(err)
    } finally{
        setLoading(false)
    }   


   
}

const handleLogout = async () => {
    setLoading(true)
     await logout()
    setUser(null)
    setLoading(false)
}

const handleSuggestion = async () => {
    setLoading(true)
    try {
        const response = await suggestion()
        
        setsuggestedUsers(response.suggestedUsers)
        // handle the response as needed
    } catch (err) {
        const message = err?.response?.data?.message || "Something went wrong"
        setError(message)
        console.log(err)
    } finally {
        setLoading(false)

    } 
    
}

const updateFollowState = (username, value) => {
  setsuggestedUsers(prev =>
    prev.map(u =>
      u.username === username
        ? { ...u, isFollowing: value }
        : u
    )
  )
}


useEffect( () => {
    handleGetMe()
},[])


 return {
        user,loading, handleRegister , handleLogin,error,handleGetMe, handleLogout, handleSuggestion, suggestedUsers,
        updateFollowState
    }

}

export default useAuth