import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import "../style/form.scss"
const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const {loading, handleRegister} = useAuth()

async  function handleSubmit (e) {
         e.preventDefault()

        await  handleRegister(username,email,password)
        navigate("/")
    }

    if(loading){
      return (
        <main>
          <h1>Loading.....</h1>
        </main>
      )
    }

  return (
    <main>
        <div className='form-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="text"
            name='username'
            onChange={(e) => {setUsername(e.target.value)}}
            placeholder='enter username' />

          <input type="text"
          name='email'
            onChange={(e) => {setEmail(e.target.value)}}

            placeholder='enter email' />
            <input type="text"
            onChange={(e) => {setPassword(e.target.value)}}

            name='password'
            placeholder='eneter password' 
            />

            <button type='submit'>Register</button>
        </form>
        <p>Dont have an account 
        <Link className='authtoggle' to="/login">login</Link>

        </p>
    </div>
    </main>
  )
}

export default Register