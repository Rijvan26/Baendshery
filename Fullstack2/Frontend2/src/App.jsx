import React, {useState, useEffect} from 'react'
import axios from "axios"
const App = () => {
    const [notes, setNotes] = useState([
        
    ])

const API = "http://localhost:3000"


    function fetchApi() {
       axios.get(`${API}/api/notes`)
    .then((res) => {

      setNotes(res.data.notes || [])
    })
    }

    function handlerSubmit(e) {
         e.preventDefault()

         const {title, description} = e.target.elements

         console.log(title.value,description.value)

         axios.post(`${API}/api/notes`,{
          title:title.value,
          description:description.value,

         })
         .then((res) => {
            console.log(res)
            fetchApi()
         })
    }

    function deleteHandler (id) {

      axios.delete(`${API}/api/notes/${id}`)
      .then((res) => {
        console.log(res.data)
        fetchApi()
      })
    }

    useEffect(() => {
      fetchApi()
    },[])
    

  return (
         <>
      
 <form className='note-create-form' onSubmit={handlerSubmit}>
       <input type='text'
        placeholder='Enter task'
       name='title'
        />
        <input type='text'
         placeholder='Enter description'
       name='description'
        />

        <button type='submit'>Create note</button>
    </form>

          <div className="notes">
            {
                notes.map(note => {
                    return (
                        <div className="note">
                            <h2>{note.title}</h2>
                            <p>{note.description}</p>
                            <button onClick={() => {deleteHandler(note._id)}}>delete</button>
                        </div>
                    )
            })
            }
          </div>
         </>
  )
}

export default App