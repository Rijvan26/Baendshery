import {register,login ,getMe,logout} from "../services/auth.api"
import { createContext, useContext, useState , useEffect} from "react"
import { AuthContext } from "../auth.context"

 const useAuth = () => {
    const context = useContext(AuthContext)
    const {loading, setLoading, user , setUser} = context

    const handleregister = async ({username, email, password}) => {
        try {
            setLoading(true)
            const data = await register({ username, email, password })
            setUser(data.user)
            alert("Registration successful!")
        } catch (error) {
            console.error("REGISTER ERROR:", error.response?.data || error.message)
            alert(error.response?.data?.message || "Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handlelogin = async ({username, password}) => {  
        try {
            setLoading(true)
            const data = await login({ username, password })
            setUser(data.user)
            alert("Logged in successfully!")
        } catch (error) {
            console.error("LOGIN ERROR:", error.response?.data || error.message)
            alert(error.response?.data?.message || "Login failed. Check your credentials.")
        } finally {
            setLoading(false)
        }
    }

   const handlegetMe = async () => {
    try {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
    } catch (error) {
        console.log("GET ME ERROR:", error.response?.data || error.message)
        setUser(null) // important
    } finally {
        setLoading(false) // ALWAYS runs
    }
}
    const handlelogout = async () => { 
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(() => {
        handlegetMe()
    }, [])

    return ({handleregister, handlelogin, handlegetMe, handlelogout, loading, user})

}


    export default useAuth