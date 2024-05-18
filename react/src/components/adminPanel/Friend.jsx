import { useState } from "react";
import { PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import FlexBetween from "../FlexBetween";
import UserImage from "../UserImage";

const Friend = ({ userId, friendId, removeFriend }) => {

   const [user, setUser] = useState({
      name:'',
      subtitle: '',
      userPicturePath: '',
   })

   const dispatch = useDispatch();
   const navigate = useNavigate();


   const { palette } = useTheme();
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const main = palette.primary.main;
   const medium = palette.primary.medium;

   const getUser = async () => {
      axiosClient.get(`/user/${friendId}`)
         .then(({ data }) => {
            setUser({
               name: `${data.first_name} ${data.last_name}`,
               subtitle: data.location,
               userPicturePath: data.image_path
            })
         })
         .catch(() => {
         })
   };

   const patchFriend = async () => {
      removeFriend(friendId);
      axiosClient.patch(`/user/${userId}/${friendId}`)
         .then(({ data }) => {
            dispatch(setFriends({ friends: data }))
         })
   };

   useEffect(() => {
      getUser(friendId);
   }, [])

   if (!user.name) return (
      null
   )

   return (
      <FlexBetween>
         <FlexBetween gap="1rem">
            <UserImage image={user.userPicturePath} size="55px" />
            <Box
               onClick={() => {
                  navigate(`/adminpanel/users/${friendId}`);
                  navigate(0);
               }}
            >
               <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  sx={{
                     "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                     },
                  }}
               >
                  {user.name}
               </Typography>
               <Typography color={medium} fontSize="0.75rem">
                  {user.subtitle}
               </Typography>
            </Box>
         </FlexBetween>
         <IconButton
            onClick={()=>patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
         >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
         </IconButton>
      </FlexBetween>
   );
};

export default Friend;