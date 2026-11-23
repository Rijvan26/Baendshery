import React from 'react'
import AppRoutes from './AppRoutes'
import "./feature/shared/style.scss"
import { AuthProvider } from './feature/auth/auth.context.jsx'
import { PostContextProvider } from './feature/post/post.context.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <PostContextProvider>
          <AppRoutes />
        </PostContextProvider>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App
