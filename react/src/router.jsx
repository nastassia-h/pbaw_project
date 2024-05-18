import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from "./components/GuestLayout";
import HomePage from './views/HomePage'
import Login from './views/Login'
import Signup from './views/Signup'
import Profile from './views/Profile'
import NotFound from './views/NotFound'
import UserForm from "./views/widgets/UserForm";
import AdminLogin from "./views/AdminPanel/AdminLogin";
import DefaultAdminLayout from "./components/adminPanel/DefaultAdminLayout";
import GuestAdminLayout from "./components/adminPanel/GuestAdminLayout";
import UsersGrid from "./views/AdminPanel/UsersGrid";
import PostsGrid from "./views/AdminPanel/PostsGrid";
import UserPage from "./views/AdminPanel/UserPage";
import PostPage from "./views/AdminPanel/PostPage";


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
            path: '/profile/:id',
            element: <Profile />
         },
         {
            path: '/homepage/edit',
            element: <UserForm />
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
      path: '/adminpanel',
      element: <GuestAdminLayout />,
      children: [
         {
            path: '/adminpanel/login',
            element: <AdminLogin />
         },
      ]
   },
   {
      path: '/adminpanel',
      element: <DefaultAdminLayout />,
      children: [
         {
            path: '/adminpanel/users',
            element: <UsersGrid />
         },
         {
            path: '/adminpanel/users/:id',
            element: <UserPage />
         },
         {
            path: '/adminpanel/posts',
            element: <PostsGrid />
         },
         {
            path: '/adminpanel/posts/:id',
            element: <PostPage />
         },
      ]
   },
   {
      path: '*',
      element: <NotFound />
   }
])

export default router