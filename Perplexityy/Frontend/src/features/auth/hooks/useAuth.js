import { useDispatch } from "react-redux"
import {registerUser,loginUser, getMe} from "../services/auth.service"
import { setUser,setLoading,setError } from "../auth.slice"
const useAuth = () => {
   const dispatch = useDispatch()
    async function handleRegister(username, email , password) {
        try {
          dispatch(setLoading(true))
          const data = await registerUser(username,email,password)
        } catch {
            dispatch(setError("Failed to register"))
        } finally {
            dispatch(setLoading(false))
        }
    }

     async function handleLogin( email , password) {
        try {
          dispatch(setLoading(true))
          const data = await loginUser(email,password)
          dispatch(setUser(data.user))
        } catch {
            dispatch(setError(err?.response?.data?.message || "Failed to login"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe () {
         try {
           dispatch(setLoading(true))
           const data = await getMe()
           dispatch(setUser(data.user))
         } catch {
                dispatch(setError(err?.response?.data?.message || "Failed to fetch user data"))
         } finally {
                dispatch(setLoading(false))
         }

    }

    return ({
        handleRegister,
        handleLogin,
        handleGetMe
    })
} 

export default useAuth