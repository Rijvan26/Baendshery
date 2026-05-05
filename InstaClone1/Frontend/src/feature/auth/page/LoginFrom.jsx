import React,{useState} from 'react'
import { Link } from 'react-router'
import "../style/login.scss"
import axios from 'axios'
import {useAuth} from "../hooks/userAuth"
import {useNavigate} from 'react-router'
const login = () => {

  const {error, user,loading,handleLogin} = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


 async function submitHandler (e) {
    e.preventDefault()
 const success = await handleLogin(username,password)
 if(success) {  
  navigate("/feed")
 }
    
  }

  if(loading) {
    return (
      <main><h1>Loging in...</h1></main>
    )
  }
  return (
    <main className="login-main">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler} >
          {error && <p className="error">{error}</p>}
          <input 
          type="text"
          onInput={(e) => {setUsername(e.target.value)}}
          name='username'
          required
         placeholder='Enter username' />
          
           <input 
           type="password"
           required
           onInput={(e) => {setPassword(e.target.value)}}
           name='password'
           placeholder='Enter password'
           />

           <button className='btn primary-btn' type='submit' disabled={loading}>
             {loading ? "Logging in..." : "login"}
            </button>
        </form>
          <p>Dont  have an Account  <Link className='authtoggle' to="/register"> Register</Link></p>
        
      </div>
    </main>
  )
}

export default login