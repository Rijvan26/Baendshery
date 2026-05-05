import React from 'react'
import "../navbar.scss"
import {useNavigate, Link} from 'react-router'
import {useAuth} from "../../auth/hooks/userAuth"

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
  return (
    <div className='navbar'>
      <Link to="/feed" className="navbar-logo"> <span><i class="ri-instagram-line"></i></span> RizzGram</Link>
        <div className="navlinks">
           

          <button onClick={() => {navigate("/create-post")}}
        className='button primarybtn'>Post✨</button>
        {user ? (
            <div className="profile-container">
         <div className="profile-img">
         <Link to="/get-me">
            <img src={user?.profilePic} alt="Profile Picture" />
          </Link>
        </div>

        </div>
           ) : ""}
        </div>
    </div>
  )
}

export default Navbar