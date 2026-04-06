import React,{useState, useRef} from 'react'
import "../styles/createpost.scss"
import usePost from '../hooks/usePost'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [caption, setCaption] = useState("")
    const PostImageInputFeildRef = useRef()
    const navigate = useNavigate()
    const {handleCreatePost, loading} = usePost()

    const submitHandler = async (e) => {
        e.preventDefault()

        const file = PostImageInputFeildRef.current.files[ 0 ]
        await handleCreatePost(file, caption)
          navigate("/feed")

    }
  return (
    <main className='create-post-page'>
         <div className="form-container">
            <h3>Post something on RizzGram</h3>
         <form onSubmit={submitHandler}>
            <input 
            className='caption-input'
             type="text"
            placeholder='Enter Caption'
            value={caption}
            onChange={(e) => {setCaption(e.target.value)}}
            />
            
            <label className='input-file-label' htmlFor="input-file"> Choose Photo</label>
            <input type="file"
            id='input-file'
            hidden
             ref={PostImageInputFeildRef}

             />

             <button className='button primary-btn'>Post Now</button>
         </form>
         </div>
    </main>
  )
}

export default CreatePost