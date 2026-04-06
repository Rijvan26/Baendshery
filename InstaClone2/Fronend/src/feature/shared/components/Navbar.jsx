import React from 'react'
import "../navbar.scss"
import {useNavigate} from 'react-router'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='navbar'>
        <p>Insta</p>
        <button onClick={() => {navigate("/create-post")}}
        className='button primarybtn'>Create Post</button>
    </div>
  )
}

export default Navbar