import { useDispatch } from "react-redux"
import {registerUser,loginUser, getMe} from "../services/auth.service"
import { setUser,setLoading,setError } from "../auth.slice"
import { toast } from "sonner"
const useAuth = () => {
   const dispatch = useDispatch()
    async function handleRegister(username, email , password) {
        try {
          dispatch(setLoading(true))
          const data = await registerUser(username,email,password)
          toast.success("Register successfully")
          return data

        } catch(err) {
            dispatch(setError("Failed to register"))
            toast.error("Failed to register")
            return null

        } finally {
            dispatch(setLoading(false))
        }
    }

     async function handleLogin( email , password) {
        try {
          dispatch(setLoading(true))
          const data = await loginUser(email,password)
          dispatch(setUser(data.user))
          toast.success("Login successfully")
          return data
        } catch (err) {
    const message =
      err?.response?.data?.message || "Failed to fetch user data";

    dispatch(setError(message));
    toast.error(message);

    return null;
}finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe () {
         try {
           dispatch(setLoading(true))
           const data = await getMe()
           dispatch(setUser(data.user))
          return data
            
         } catch (err) {
    if (err?.response?.status !== 400) {
        toast.error("Failed to fetch user data");
    }

    return null;
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