/* eslint-disable no-unused-vars */
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/user/profile',
        element:<div>Perfil de ususario</div>
    },

])