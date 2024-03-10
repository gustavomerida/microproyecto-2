/* eslint-disable no-unused-vars */
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import AppLayout from './layout/AppLayout'
import ShowClubes from './pages/ShowClubes'

export const router = createBrowserRouter([
    {
        path:'/user/profile',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/clubs',
        element:<ShowClubes/>
    },

])