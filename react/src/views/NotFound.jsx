import React from 'react'
import { Box } from '@mui/material'

const NotFound = () => {
   return (
      <Box 
         width="100vw" 
         height="100vh" 
         display="flex" 
         justifyContent="center" 
         alignItems="center"
         bgcolor="white"
      >
         <img width="auto" height="80%" src={'http://localhost:3000/src/assets/404.jpg'} alt="not-found"/>
      </Box>
   )
}

export default NotFound