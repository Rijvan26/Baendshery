import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import "../style/form.scss"
import useAuth from '../hooks/useAuth'
const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
 const navigate = useNavigate()
    const {loading,handleLogin} = useAuth()
 async   function handleSubmit(e) {
          e.preventDefault()
    
          await handleLogin(username, password)
          navigate("/")
         
    }

    if(loading){
      return (
        <main>
          <h1>Loading...</h1>
        </main>
      )
    }
  return (
    <main>
        <div className='form-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} >
            <input type="text"
            name='username'
            onInput={(e) => {setUsername(e.target.value)}}
            placeholder='enter username' />

            <input type="text"
            name='password'
            onInput={(e) => {setPassword(e.target.value)}}

            placeholder='eneter password' 
            />

            <button type='submit'>Login</button>
        </form>
        <p>Dont have an account 
        <Link className='authtoggle' to="/register">Register</Link>

        </p>
    </div>
    </main>
  )
}

export default Login