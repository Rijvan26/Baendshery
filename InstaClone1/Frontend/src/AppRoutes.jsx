import {BrowserRouter, Routes,Route} from 'react-router-dom'
import LoginFrom from './feature/auth/page/LoginFrom'
import RegisterFrom from './feature/auth/page/RegisterFrom'
import Feed from "./feature/post/pages/Feed"
import Home from './feature/shared/components/Home'
import { CreatePost } from './feature/post/pages/CreatePost'
import MainLayout from './layout/MainLayout'
import Profile from './feature/auth/page/Profile'
import Protected from './feature/auth/components/Protected'


 function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>

            {/* this layout navbar inside every route that inside it  */}
            <Route element={<MainLayout />}>
           <Route path='/home' element={<Home />} /> 
           <Route path='/feed' element={<Feed />} /> 
            <Route path='/' element={<Protected />} />
            <Route path='/create-post' element={<CreatePost/>} />
            <Route path="get-me" element={<Profile />} />
            <Route path='/login' element={<LoginFrom/>} />


        
            </Route>
            
            <Route path='/register' element={<RegisterFrom/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes