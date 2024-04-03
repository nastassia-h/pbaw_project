import React, { useEffect, useState } from 'react'
import { Search } from "@mui/icons-material"
import { InputBase, IconButton, MenuItem, Typography, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosClient from '../axios-client';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { NavLink } from 'react-router-dom';

const UsersSearch = () => {
   const [searchUser, setSearchUser] = useState("")
   const [foundUsers, setFoundUsers] = useState([])
   const [isOptionsShown, setIsOptionsShown] = useState(false)
   const mode = useSelector(state => state.mode)

   const searchUsers = async (searchUser) => {
      if (searchUser === "") return
      axiosClient.get(`/user?user_first_name=${searchUser.split(' ')[0]}&user_last_name=${searchUser.split(' ')[1] ?? ""}`)
         .then(({ data }) => {
            setFoundUsers([...data])
         })
         .catch(() => {
         })
   };

   const handleBlur = async () => {
      setTimeout(() => {
         setIsOptionsShown(false)
         setFoundUsers([])
      }, 200)
   }

   useEffect(() => {
      searchUsers(searchUser)
   }, [searchUser])

   return (
      <>
         <InputBase onFocus={() => setIsOptionsShown(true)} onBlur={handleBlur} zindex={20} value={searchUser} onChange={(e) => setSearchUser(e.target.value)} sx={{ color: mode === 'dark' ? 'white' : 'black' }} placeholder='Search...'>
            <IconButton>
               <Search />
            </IconButton>
         </InputBase>
         {isOptionsShown &&
            <Box position='absolute' top='99%' left={0} width='100%' zindex={10}
               sx={{
                  backgroundColor: '#42a5f5',
                  maxHeight: '400px',
                  overflow: 'auto',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
               }}
            >
               {foundUsers?.map(foundUser =>
                  <>
                     <MenuItem key={foundUser.id}>
                        <FlexBetween gap='0.5rem'>
                           <UserImage size='8' image={foundUser.image_path} />
                           <NavLink reloadDocument={true} to={`profile/${foundUser.id}`}>
                              <Typography color='white' style={{ textDecoration: 'none' }} fontSize='12px'>{foundUser.first_name} {foundUser.last_name}</Typography>
                           </NavLink>
                        </FlexBetween>
                     </MenuItem>
                     <Divider style={{ padding: 0, margin: 0 }} />
                  </>
               )}
            </Box>
         }

      </>

   )
}

export default UsersSearch