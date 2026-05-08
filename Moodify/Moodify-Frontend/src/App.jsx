import React from 'react'
import { RouterProvider } from 'react-router-dom'
import {router} from "./Approute"
import "./shared/styles/global.scss"
import { AuthContextProvider } from './features/auth/auth.context'
import { SongContextProvider } from './features/Home/song.context'
const App = () => {
  return (
    <SongContextProvider>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
    </SongContextProvider>

  )
}

export default App