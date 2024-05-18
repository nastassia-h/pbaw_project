import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const GuestAdminLayout = () => {
   const theme = useTheme()
   const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

   const token = useSelector(state => state.token)
   const roles = useSelector(state => state.roles)

   if (token && roles.includes('admin')) {
      return <Navigate to="/adminpanel/users" />
   }

   return (
      <Box>
         <Box width="100%" backgroundColor={theme.palette.background.default} p="1rem 6%" textAlign="center">
            <Typography
               fontWeight="bold"
               fontSize="32px"
               color="primary"
            >
               Peoplebook
            </Typography>
         </Box>
         <Box width={isNonMobileScreen ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
            <Typography fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }}>
            Admin Panel
            </Typography>
            <Outlet />
         </Box>
      </Box>
   )
}

export default GuestAdminLayout
