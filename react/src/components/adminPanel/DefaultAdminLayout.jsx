import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/system'
import SidebarMenu from '../../views/AdminPanel/SidebarMenu'
import Notification from '../Notification'

const DefaultAdminLayout = () => {

   const token = useSelector(state => state.token)
   const roles = useSelector(state => state.roles)

   if (!token || !roles.includes('admin')) {
      return <Navigate to="/adminpanel/login" />
   }

   return (
      <Box>
         <Notification/>
         <SidebarMenu/>
         <Box pt="2rem"
            pl="4rem"
            pr="0.5rem"
            display="grid" 
            alignItems="center" 
            justifyContent="center"
         >
            <Outlet/>
         </Box>
      </Box>
   )
}

export default DefaultAdminLayout