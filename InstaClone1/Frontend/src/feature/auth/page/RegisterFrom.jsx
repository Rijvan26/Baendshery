import { Link,useNavigate } from "react-router"
import {useState,useRef} from 'react'
import axios from 'axios'
import userAuth from "../hooks/userAuth"


const register = () => {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
const ProfilePicInputFieldRef = useRef(null)

const {error,loading, handleRegister} = userAuth()
const navigate = useNavigate()
const  submitHandler = async (e) => {
  e.preventDefault()

  const file = ProfilePicInputFieldRef.current.files[0]
  let profilePic = file || null;
  
  const success = await handleRegister(username, email, password, bio, profilePic)
  if(success) {
    navigate("/")
  }

}

if(loading) {
  return (
    <main><h1>Loading...</h1></main>
  )
}


  
  return (
     <main className="login-main">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          {error && <p className="error">{error}</p>}
          <input type="text"
          onInput={(e) => {setUsername(e.target.value)}}
          name='username'
           placeholder='enter username' />
           <input type="email"
          name='email'
          onInput={(e) => {setEmail(e.target.value)}}
           placeholder='enter email' />
           <input type="password"
           name='password'
          onInput={(e) => {setPassword(e.target.value)}}

           placeholder='enater password'
           />

           <input type="text"
           name="bio"
           onInput={(e) => {setBio(e.target.value)}}
           placeholder='enter bio'
           />
           
           <label className="profile-pic-label" htmlFor="profilePic">Profile Picture</label>
           <input type="file"
           hidden
           name="profilePic"
           id="profilePic"
           ref={ProfilePicInputFieldRef}
          //  onInput={(e) => {setProfilePic(e.target.value)}}
           placeholder='enter profile picture url'
           /> 
           <button className='btn primarybtn' type='submit' disabled={loading}>
             {loading ? "Submitting..." : "Register"}
              </button>
        </form>
        <p>Already have an Account <Link className='authtoggle' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default register