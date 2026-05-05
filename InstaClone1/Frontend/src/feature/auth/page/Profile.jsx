import React,{useEffect} from 'react'
import {useAuth} from "../hooks/userAuth"
import {usePost} from "../../post/hook/usePost"
import Protected from '../components/Protected'
import SuggestedUsers from '../../shared/components/SuggestedUsers'
import "../style/profile.scss"
import Sidebar from '../../shared/components/Sidebar'
const Profile = () => {
    const {user, handleGetMe, handleLogout,handleSuggestion,suggestedUsers}   = useAuth()
    const {post,handleGetPosts} = usePost()

    useEffect(() => {
        handleGetMe()
    },[])
   
    useEffect(() => {
      handleGetPosts()
    },[])

    useEffect(() => {
        if(user) {
            handleSuggestion() 
        }
    }, [user])

  return (
    <main className='profile-main'>
        {/* user profile content goes here */}
        <div className="sidebar">
          <Sidebar user={user} />
        </div>
        <div className="profile-suggestions">
                <SuggestedUsers users={suggestedUsers} />

      </div>
      <div className="user-profile-container">
         <div className="profile-container">
         <div className="profile-img">
        <img src={user?.profilePic} alt="Profile Picture" />

        </div>
       <div className="profile-details">
         <h1>{user?.username}</h1>
         <p>{user?.email}</p>
        <p>{user?.bio}</p>
       </div>
       <div className="logout">
        <Protected>
        <p className="logout-btn" onClick={handleLogout}> <span><i class="ri-logout-circle-line"></i></span> Logout</p>
        </Protected>
       </div>
       </div>

        <h4 className="user-post-heading"> Posts</h4>

       <div className="post-container">
        
        {post?.map((post) => (
            <div key={post._id} className="post-item">
                <img id='user-post-images' src={post.Image_url} alt="Post Image" /> 
            </div>
        ))}
       </div>
      </div>
      

    </main>
  ) 
}

export default Profile