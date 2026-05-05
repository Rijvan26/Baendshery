import {createContext, useState, useEffect} from "react";
import {login,register,getMe} from "./services/auth.api"

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [suggestedUsers, setsuggestedUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

  

  

return (
    <AuthContext.Provider value={{user,setUser,loading,setLoading, error, setError, suggestedUsers, setsuggestedUsers}} >
    {children}
    </AuthContext.Provider>
)
}

