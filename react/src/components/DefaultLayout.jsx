import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Navbar from '../views/Navbar'
import { Box } from '@mui/system'
import { useEffect } from 'react'

const DefaultLayout = () => {

   const token = useSelector(state => state.token)
   const roles = useSelector(state => state.roles)

   if (!token || !roles.includes('user')) {
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