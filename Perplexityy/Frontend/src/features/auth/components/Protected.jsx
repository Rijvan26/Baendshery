import React,  {useEffect} from 'react'
import {useSelector} from "react-redux"
import {Navigate, useNavigate} from "react-router-dom"

const Protected = ({children}) => {
 const user = useSelector(state => state.auth.user)
 const loading = useSelector(state => state.auth.loading)

 if(loading) {
    return  <div>Loading...</div>
 }

 if(!user) {
    return <div>
        please login first  <Navigate to= "/login" />
    </div>
 }
  return children
}

export default Protected