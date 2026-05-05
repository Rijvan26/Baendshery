import React from 'react'
import {useAuth} from '../hooks/userAuth'
import {useNavigate, Navigate} from 'react-router-dom'

const Protected = ({children}) => {
    const {loading, user} = useAuth()

    if(loading) {
        return (
            <main><h1>Loading.....</h1></main>
        )
    }   

    if(!user) {
        return <Navigate to={"/home"} />
    }

  return children
    
  
}

export default Protected