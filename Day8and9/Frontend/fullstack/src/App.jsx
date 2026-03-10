import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([
    
  ])

  function fetchNotes () {
    axios.get("http://localhost:3000/notes")
      .then((res) => {
        setNotes(res.data.notes || [])
        console.log(res.data.notes)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handlerSubmit (e) {
    e.preventDefault()

    const {title, description} = e.target.elements
    console.log(title.value, description.value);
    

    axios.post("http://localhost:3000/notes",{
      title:title.value,
      description:description.value
    })
    .then((res) => {
      // console.log(res);
      fetchNotes()
    })
  }

  function handleDelete (note_Id) {
      console.log(note_Id);
      axios.delete("http://localhost:3000/notes/"+note_Id)
      .then((res) => {
        console.log(res.data);
        fetchNotes()
      })
      
  }
  
useEffect(() => {
    fetchNotes()
  }, [])
  return (
    <>

    <form className='note-create-form' onSubmit={handlerSubmit}>
       <input type='text' placeholder='Enter task'
       name='title'
        />
        <input type='text' placeholder='Enter description'
       name='description'
        />

        <button type='submit'>Create note</button>
    </form>

      <div className="notes">
        {
          notes?.map(note => {
            return <div className="note">
          <h1>{note.title}</h1>
          <h2>{note.description}</h2>
          <button onClick={() => {handleDelete(note._id)}}>delete</button>
        </div>
          })
        }
      </div>
    </>
  )
}

export default App
