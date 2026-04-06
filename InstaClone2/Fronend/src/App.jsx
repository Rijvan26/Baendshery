import React from 'react'
import Approutes from '../src/Approutes'
import { AuthProvider } from './feature/auth/auth.context'
import { PostContext, PostProvider } from './feature/post/post.context'
const App = () => {
  return (
   <PostProvider>
     <AuthProvider>
    <Approutes />
    </AuthProvider>
   </PostProvider>
  )
}


export default App