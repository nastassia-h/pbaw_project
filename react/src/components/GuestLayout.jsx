import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const GuestLayout = () => {
   const theme = useTheme()
   const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

   const token = useSelector(state => state.token)

   if (token) {
      return <Navigate to="/homepage" />
   }

   return (
      <Box>
         <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
            <Typography
               fontWeight="bold"
               fontSize="32px"
               color="primary"
            >
               Peoplebook
            </Typography>
         </Box>
         <Box width={isNonMobileScreen ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
               Welcome to Peoplebook, the Social Media for real people
            </Typography>
            <Outlet />
         </Box>
      </Box>
   )
}

export default GuestLayout