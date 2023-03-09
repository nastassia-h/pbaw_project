import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from "./components/GuestLayout";
import HomePage from './views/HomePage'
import Login from './views/Login'
import Signup from './views/Signup'
import Profile from './views/Profile'
import NotFound from './views/NotFound'


const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '/',
            element: <HomePage />
         },
         {
            path: '/homepage',
            element: <HomePage />
         },
         {
            path: '/homepage/:id',
            element: <Profile />
         }
      ]
   },
   {
      path: '/',
      element: <GuestLayout />,
      children: [
         {
            path: "/login",
            element: <Login />
         },
         {
            path: '/signup',
            element: <Signup />
         },
      ]
   },
   {
      path: '*',
      element: <NotFound />
   }
])

export default router