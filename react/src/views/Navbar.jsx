import React from 'react'
import { useState, useEffect } from 'react'
import { Box, IconButton, InputBase, Typography, Select, FormControl, MenuItem, useTheme, useMediaQuery } from '@mui/material'
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from "../store/index.js"
import { useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client.js'
import FlexBetween from '../components/FlexBetween'
import { setUser } from '../store/index.js'

const Navbar = () => {
   const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const user = useSelector(state => state.user)
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
   const mode = useSelector(state => state.mode)
   const theme = useTheme()
   const neutralLight = theme.palette.primary.light
   const dark = theme.palette.primary.dark
   const background = theme.background
   const primaryLight = theme.palette.primary.light
   const alt = theme.palette.background.alt

   const fullName = `${user.first_name} ${user.last_name}`

   const logout = () => {
      axiosClient.post('/logout')
         .then(() => {
            dispatch(setLogout())
         })
   }

   useEffect(() => {
      axiosClient.get('/user')
         .then(({ data }) => {
            dispatch(
               setUser({ user: data })
            )
         })
   }, [])

   return (
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
         <FlexBetween gap="1.75rem">
            <Typography
               fontWeight="bold"
               fontSize="clamp(1rem, 2rem, 2.25rem)"
               color="primary"
               onClick={() => navigate("/homepage")}
               sx={{
                  "&:hover": {
                     color: primaryLight,
                     cursor: "pointer"
                  },
               }}
            >
               Peoplebook
            </Typography>
            {isNonMobileScreens && (
               <FlexBetween border={`2px solid ${primaryLight}`} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                  <InputBase sx={{ color: mode === 'dark' ? 'white' : 'black' }} placeholder='Search...'>
                     <IconButton>
                        <Search />
                     </IconButton>
                  </InputBase>
               </FlexBetween>
            )}
         </FlexBetween>
         {/* desktop nav */}
         {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
               <IconButton onClick={() => dispatch(setMode())}>
                  {mode === "dark" ? (
                     <DarkMode sx={{ fontSize: "25px" }} />
                  ) : (
                     <LightMode sx={{ fontSize: "25px" }} />
                  )}
               </IconButton>
               <Message sx={{ fontSize: "25px" }} />
               <Notifications sx={{ fontSize: "25px" }} />
               <Help sx={{ fontSize: "25px" }} />
               <FormControl variant='standard' value={fullName}>
                  <Select
                     value={fullName}
                     sx={{
                        color: 'white',
                        backgroundColor: neutralLight,
                        maxWidth: "250px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                           pr: "0.25rem",
                           width: "3rem"
                        },
                        "& .MuiSelect-select:focus": {
                           backgroundColor: dark
                        }
                     }}
                     input={<InputBase />}
                  >
                     <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                     </MenuItem>
                     <MenuItem onClick={logout}>Log Out</MenuItem>
                  </Select>
               </FormControl>
            </FlexBetween>
         ) : (
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
               <Menu />
            </IconButton>
         )}

         {/* Mobile menu */}
         {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
               position="fixed"
               right="0"
               bottom="0"
               height="100%"
               zIndex="10"
               maxWidth="500px"
               minWidth="300px"
               backgroundColor={neutralLight}
            >
               {/* Close icone */}
               <Box display="flex" justifyContent="flex-end" p="1rem">
                  <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                     <Close />
                  </IconButton>
               </Box>
               {/* Menu items */}
               <FlexBetween flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                  <IconButton onClick={() => dispatch(setMode())}>
                     {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                     ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                     )}
                  </IconButton>
                  <Message sx={{ fontSize: "25px" }} />
                  <Notifications sx={{ fontSize: "25px" }} />
                  <Help sx={{ fontSize: "25px" }} />
                  <FormControl variant="standard" value={fullName}>
                     <Select
                        value={fullName}
                        sx={{
                           backgroundColor: neutralLight,
                           maxWidth: "200px",
                           borderRadius: "0.25rem",
                           p: "0.25rem 1rem",
                           "& .MuiSvgIcon-root": {
                              pr: "0.25rem",
                              width: "3rem"
                           },
                           "& .MuiSelect-select:focus": {
                              backgroundColor: neutralLight
                           }
                        }}
                        input={<InputBase />}
                     >
                        <MenuItem value={fullName}>
                           <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={logout}>Log Out</MenuItem>
                     </Select>
                  </FormControl>
               </FlexBetween>
            </Box>
         )}

      </FlexBetween>
   )
}

export default Navbar