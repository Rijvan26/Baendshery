import React ,{useEffect} from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes'
import "./feature/shared/style.scss"
import {AuthProvider} from './feature/auth/auth.context.jsx'
import { PostContextProvider } from './feature/post/post.context.jsx'
import Navbar from './feature/shared/components/Navbar.jsx'
import {useAuth} from "../src/feature/auth/hooks/userAuth.js"
const App = () => {


  return (
     <AuthProvider>
       <PostContextProvider> 
        <AppRoutes />
    </PostContextProvider> 
     </AuthProvider> 
  )
}

export default App