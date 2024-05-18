import {
   DeleteOutlined
} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { Box, Typography, Divider, Dialog, DialogTitle, Button, useTheme, IconButton, Link, DialogActions, DialogContent } from "@mui/material";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { useDispatch} from 'react-redux';
import { setNotification } from '../../../store/index.js'

export default function PostWidget(props) {
   const { palette } = useTheme();
   const dark = palette.primary.dark;
   const medium = palette.primary.medium;
   const main = palette.primary.main;
   const dispatch = useDispatch()

   const {
      id,
      user,
      description,
      image_path,
      likes,
      comments,
      created_at
   } = props.post;

   const [open, setOpen] = useState(false);
   const [isImageShow, setIsImageShow] = useState(false)
   const navigate = useNavigate();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const onDeleteClick = () => {
      axiosClient.delete(`/post/${id}`)
     .then(() => { 
       dispatch(setNotification(`Post ${id} was successfully deleted`));
       navigate('/adminpanel/posts')
     })
     .catch(() => {
     })
   }

   return (
      <WidgetWrapper>
         {/* FIRST ROW */}
         <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem">
               <Typography color={dark}>User:</Typography>
               <Link href={`/adminpanel/users/${user.id}`}>
                  <Typography color={medium}>{user.first_name} {user.last_name}</Typography>
               </Link>
            </Box>
         </Box>

         <Divider />

         <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem">
               <Typography color={dark}>Description:</Typography>
               <Typography color={medium}>{description}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
               <Typography color={dark}>Image:</Typography>
               {image_path ? (
                  <Button variant="text" onClick={()=>setIsImageShow(!isImageShow)}>
                     Show image
                  </Button>
               ) : "-"}
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
               <Typography color={dark}>Comments:</Typography>
               <Typography color={medium}>{comments.length}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
               <Typography color={dark}>Likes:</Typography>
               <Typography color={medium}>{likes.length}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
               <Typography color={dark}>Created date:</Typography>
               <Typography color={medium}>{created_at}</Typography>
            </Box>
         </Box>

         <Divider />

         <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem">
               <Typography color={medium}>Delete post</Typography>
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
         {image_path ? (
            <Dialog
               onClose={()=>setIsImageShow(false)}
               open={isImageShow}>
                  <DialogContent>
                     <Box display='flex' justifyContent='space-between' p="1rem">
                        <img
                        width="100%"
                        height="auto"
                        alt="post image"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={image_path}
                        />
                     </Box>
                  </DialogContent>
                  <DialogActions>
                     <Button variant="text" color="primary" onClick={()=>setIsImageShow(false)}>Close</Button>
                  </DialogActions>
            </Dialog>
            ) : <></>}
      </WidgetWrapper>
   );
}
