import React, {useState, useEffect} from 'react'
import axios from "axios"
import Navbar from "../src/components/Navbar"
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Box
} from "@mui/material"
const App = () => {
    const [notes, setNotes] = useState([ ])
    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState({title:"", description:""})

const API = "https://baendshery-2.onrender.com"


    function fetchApi() {
       axios.get(`${API}/api/notes`)
    .then((res) => {

      setNotes(res.data.notes || [])
    })
    }

    function handlerSubmit(e) {
         e.preventDefault()

         const {title, description} = e.target.elements


         axios.post(`${API}/api/notes`,{
          title:title.value ,
          description:description.value ,

         })
         .then((res) => {
            console.log(res)
            fetchApi()
            e.target.reset()
         })
    }

    function deleteHandler (id) {

      axios.delete(`${API}/api/notes/${id}`)
      .then((res) => {
        console.log(res.data)
        fetchApi()
      })
    }

   

    const startEdit = (note) => {
  setEditId(note._id)
  setEditData({
    title: note.title || "",
    description: note.description || ""
  })
}

   function saveEditData(id) {
  axios.patch(`${API}/api/notes/${id}`, {
    title: editData.title.trim(),
    description: editData.description.trim()
  })
  .then((res) => {
    setNotes(prev =>
      prev.map(note =>
        note._id === id ? { ...note, ...editData } : note
      )
    )

    setEditId(null)
    setEditData({ title: "", description: "" })
  })
}
    useEffect(() => {
      fetchApi()
    },[])
    

  return (

    <main>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    padding: "10px"
   }}>
    
    {/* Create Form */}
    <Box
      component="form"
      onSubmit={handlerSubmit}
      sx={{ display: "flex", gap: 2, mb: 4 }}
    >
      <TextField name="title" label="Task" fullWidth />
      <TextField name="description" label="Description" fullWidth />
      <Button variant="contained" type="submit">
        Add
      </Button>
    </Box>

    {/* Notes List */}
    <Stack spacing={2}>
      {notes.map(note => (
        <Card key={note._id} sx={{ borderRadius: 3 }}>
          <CardContent>

            {note._id === editId ? (
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData(prev => ({
                      ...prev,
                      title: e.target.value
                    }))
                  }
                />

                <TextField
                  label="Description"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                />

                <Button
                  variant="contained"
                  onClick={() => saveEditData(note._id)}
                >
                  Save
                </Button>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <Typography variant="h6">{note.title}</Typography>
                <Typography color="text.secondary">
                  {note.description}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => startEdit(note)}
                  >
                    Edit
                  </Button>
                </Stack>
              </Stack>
            )}

          </CardContent>
        </Card>
      ))}
    </Stack>

  </Container>
    </main>
  
)
}

export default App