import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./feature/auth/pages/Login"
import Register from "./feature/auth/pages/Register"
import Feed from './feature/post/pages/Feed'
import CreatePost from './feature/post/pages/CreatePost'

function AppRouter () {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<h2>welcome to my 4lalyer app</h2>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/feed' element={<Feed />}/>
            <Route path='/create-post' element={<CreatePost />}/>

           
        </Routes>
        </BrowserRouter>
    )
}



export default AppRouter