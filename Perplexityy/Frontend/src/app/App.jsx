import {useState, useEffect} from 'react'
import {RouterProvider} from 'react-router-dom'
import {router} from './app.router'
import useAuth from "../features/auth/hooks/useAuth"
import { Toaster } from 'sonner'

function App() {
  const auth = useAuth()

  useEffect(() => {
    auth.handleGetMe()
  }, [])

  return (
    <>
    <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
