import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Navbar from '../views/Navbar'
import { Box } from '@mui/system'
import { useEffect } from 'react'

const DefaultLayout = () => {

   const token = useSelector(state => state.token)

   if (!token) {
      return <Navigate to="/login" />
   }

   return (
      <Box>
         <Navbar />
         <Outlet />
      </Box>
   )
}

export default DefaultLayout