import React, {useState} from 'react'
import FormGroutp from '../components/FormGroutp'
import "../styles/login.scss"
import {useNavigate} from "react-router-dom"
import useAuth from '../hooks/useAuth'
const Login = () => {
const navigate = useNavigate()

  const {loading, handlelogin} = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    await handlelogin({
    username, password})
       navigate("/")
  }
  return (
    <main className='login-page'>
           <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
             <FormGroutp 
              label="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
           <FormGroutp 
  label="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
/>
            <button type="submit" disabled={loading}>
              {loading ? "Authenticating..." : "Login"}
            </button>
        </form>

    </div>
    </main>
  )
}

export default Login