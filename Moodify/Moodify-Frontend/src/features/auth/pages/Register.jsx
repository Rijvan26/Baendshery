import React , {useState} from 'react'
import FormGroutp from '../components/FormGroutp'
import "../styles/register.scss"
import useAuth from '../hooks/useAuth'

 const Register = () => {
    const {loading,handleregister} = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
       await handleregister({username, email, password})
       
    }

    if(loading) {
        return (
            <main>
                <h1>Loading.....</h1>
            </main>
        )
    }
  return (
    <div>
        <main className='register-page'>
           <div className='register-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
         <FormGroutp 
  label="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Enter your name"
/>

<FormGroutp 
  label="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>

<FormGroutp 
  label="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
/>
            <button type="submit">Register</button>
        </form>
        
    </div>
    </main>
    </div>
  )
}

export default Register