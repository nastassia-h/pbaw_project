import {
   ManageAccountsOutlined,
   DeleteOutlined,
   ArrowBack 
} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useState } from "react";
import { Box, Typography, Divider, Dialog, DialogTitle, Button, useTheme, IconButton } from "@mui/material";
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import axiosClient from "../../../axios-client";
import { setNotification } from "../../../store";
import UserForm from "./UserForm";


export default function UserWidget({user}) {
   const { palette } = useTheme();
   const dark = palette.primary.dark;
   const medium = palette.primary.medium;
   const main = palette.primary.main;

   const [userState, setUserState] = useState(user)

   const {
      id,
      first_name,
      last_name,
      location,
      occupation,
      image_path,
      friend_list,
      created_at
   } = userState;

   const [open, setOpen] = useState(false);
   const [isEditMode, setIsEditMode] = useState(false);
   const navigate = useNavigate();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const setData = (data) => {
      setUserState(data)
      setIsEditMode(false)
   }

   const dispatch = useDispatch()
   const onDeleteClick = () => {
      axiosClient.delete(`/user/${id}`)
      .then(() => { 
         dispatch(setNotification(`User ${id} was successfully deleted`));
         navigate('/adminpanel/users')
      })
      .catch(() => {
      })
   }

   return (
      <WidgetWrapper minWidth="fit-content" flexGrow={2}>
         {!isEditMode
         ? (
            <>
               {/* FIRST ROW */}
               <FlexBetween
                  gap="2rem"
                  pb="1.1rem"
               >
                  <FlexBetween gap="1rem">
                     <UserImage image={image_path} />
                     <Box>
                        <Typography
                           variant="h4"
                           color={dark}
                           fontWeight="500"
                        >
                           {first_name} {last_name}
                        </Typography>
                        <Typography color={medium}>{friend_list ? friend_list.length : 0} friends</Typography>
                     </Box>
                  </FlexBetween>
                  <ManageAccountsOutlined color={dark}
                     onClick={()=>setIsEditMode(true)}
                     sx={{
                        "&:hover": {
                           color: palette.primary.light,
                           cursor: "pointer",
                        },
                     }}
                  />
               </FlexBetween>

               <Divider />

               {/* SECOND ROW */}
               <Box p="1rem 0">
                  <Box display="flex" alignItems="center" gap="1rem">
                     <Typography color={dark}>Location:</Typography>
                     <Typography color={medium}>{location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap="1rem">
                     <Typography color={dark}>Occupation:</Typography>
                     <Typography color={medium}>{occupation}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap="1rem">
                     <Typography color={dark}>Created date:</Typography>
                     <Typography color={medium}>{created_at}</Typography>
                  </Box>
               </Box>

               <Divider />

               <Box p="1rem 0">
                  <Box display="flex" alignItems="center" gap="1rem">
                     <Typography color={medium}>Delete user</Typography>
                     <IconButton
                        onClick={handleClickOpen}
                        sx={{ width: "30" }}
                     >
                        <DeleteOutlined color={'error'} />
                     </IconButton>
                  </Box>
               </Box>
               <Dialog
                  onClose={handleClose}
                  open={open}>
                  <DialogTitle>Are you sure you want to delete?</DialogTitle>
                  <Box display='flex' justifyContent='space-between' p="1rem">
                     <Button variant="text" color="primary" onClick={handleClose}>Cancel</Button>
                     <Button variant="outlined" color="error" onClick={() => { handleClose(); onDeleteClick() }}>Delete</Button>
                  </Box>
               </Dialog>
            </>
         ) : (
            <Box>
               <Button onClick={() => setIsEditMode(false)} variant="outlined"
                  color="error"
                  sx={{
                     width: '100px',
                     m: "0 0 1rem",
                     p: "0.5rem",
                  }}
               >
               <FlexBetween gap="0.5rem">
                  <ArrowBack/>
                  <Typography>Back</Typography>
               </FlexBetween>
               </Button>
               <UserForm user={userState} type="update" setData={setData}/>
            </Box>
         )}
      </WidgetWrapper>
   );
}
