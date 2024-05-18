import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Drawer, FormControl, Select, InputBase, MenuItem,Typography, Box, List, useTheme, ListItemText, ListItemIcon, IconButton, useMediaQuery } from '@mui/material'
import { Settings as SettingsIcon, Menu } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../store';
import axiosClient from '../../axios-client';

const SidebarMenu = () => {
   const user = useSelector(state => state.user);
   const dispatch = useDispatch()
   const fullname = `${user.first_name} ${user.last_name}`;

   const navigate = useNavigate();

   const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
   const [isOpen, setIsOpen] = useState(isNonMobileScreens ? true : false);
   const [selectedIndex, setSelectedIndex] = useState(0);

   const items = [
      { text: 'Users', path: '/adminpanel/users', icon: <PeopleIcon /> },
      { text: 'Posts', path: '/adminpanel/posts', icon: <ImageIcon /> },
    ];

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      navigate(items[index].path);
      setIsOpen(false);
    };

   const theme = useTheme()
   const neutralLight = theme.palette.primary.light
   const dark = theme.palette.primary.dark

   const logout = () => {
      axiosClient.post('/logout')
         .then(() => {
            dispatch(setLogout())
         })
   }

   return (
      <Drawer
        variant="permanent"
        anchor="left"
      >
         <Box p="0.5rem">
            <IconButton onClick={() => setIsOpen(!isOpen)}>
               <Menu/>
            </IconButton>
            <Box 
               mt="0.5rem"
               gap="0.5rem"
               display={isOpen ? 'grid' : 'none'}
            >
                  <FormControl variant='standard' value={fullname}>
                     <Select
                        value={fullname}
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
                        <MenuItem value={fullname}>
                           <Typography>{fullname}</Typography>
                        </MenuItem>
                        <MenuItem onClick={logout}>Log Out</MenuItem>
                     </Select>
                  </FormControl>
               <List>
               {items.map((item, index) => (
                  <MenuItem key={index} 
                     sx={{
                        m: "0.5rem 0"
                     }}
                     selected={index === selectedIndex} 
                     onClick={(event) => handleMenuItemClick(event, index)}
                  >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  </MenuItem>
               ))}
               </List>
            </Box>
         </Box>
      </Drawer>
    );
}

export default SidebarMenu
