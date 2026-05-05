import React, { useRef,useState } from 'react'
import "../style/createpost.scss"
import {usePost} from "../hook/usePost"
import {useNavigate} from 'react-router'


export const CreatePost = () => {
    const [caption, setCaption] = useState("")
   const postImageInputFieldRef = useRef(null)

   const navigate = useNavigate()
   const {loading,handleCreatePost} = usePost()

  async function handleSubmit(e) {
    e.preventDefault()

    const file = postImageInputFieldRef.current.files[ 0 ]

     await handleCreatePost(file,caption)
      navigate("/feed")
   }

   if(loading) {
    return (
        <main><h1>Loading...</h1></main>
    )
   }

  return (
    <div className='create-post-page'>
        <div className="form-container">
            <h1>Create post ✨</h1>
            <form onSubmit={handleSubmit}>
                <label className='post-image-label' htmlFor="postImage">Select Image </label>
                <input
                hidden
                 type="file" 
                name="postImage"
                id="postImage" 
                ref={postImageInputFieldRef}
                />

                <input 
                type="text"
                value={caption}
                placeholder='Enter Caption or Description about post'
                onChange={(e) => {setCaption(e.target.value)}}
                name="caption"
                id="caption"
                 />

                 <button className='button primary-btn'>Create post</button>
            </form>
        </div>

    </div>
  )
}
