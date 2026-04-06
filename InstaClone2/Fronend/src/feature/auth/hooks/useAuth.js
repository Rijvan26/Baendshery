import React, { useContext } from 'react'
import { AuthContext } from '../auth.context'
import {register,login} from "../services/auth.api"
const useAuth = () => {

    const context = useContext(AuthContext)
    const {loading, setLoading, user , setUser} = context

    const handleRegister = async (username, email, password) => {
         setLoading(true)
         const data = await register(
            username,
            email,
            password
         )
         setUser(data.user)
         setLoading(false)
    }

    const handleLogin = async (username,password) => {
        setLoading(true)
        const data = await login(username, password)
        setUser(data.user)
        setLoading(false)
    }
  return {loading,handleRegister, handleLogin}

}

export default useAuth