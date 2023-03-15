import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { setFriends } from "../store/index.js";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useSelector((state) => state.user);
   const friends = useSelector((state) => state.user.friend_list);

   const { palette } = useTheme();
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const main = palette.primary.main;
   const medium = palette.primary.medium;

   const isFriend = friends?.includes(`${friendId}`);

   const patchFriend = async () => {
      axiosClient.patch(`/user/${id}/${friendId}`)
         .then(({ data }) => {
            dispatch(setFriends({ friends: data }))
         })
   };

   return (
      <FlexBetween>
         <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />
            <Box
               onClick={() => {
                  navigate(`/profile/${friendId}`);
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
                  {name}
               </Typography>
               <Typography color={medium} fontSize="0.75rem">
                  {subtitle}
               </Typography>
            </Box>
         </FlexBetween>
         {id !== friendId &&
            <IconButton
               onClick={() => patchFriend()}
               sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
               {isFriend ? (
                  <PersonRemoveOutlined sx={{ color: primaryDark }} />
               ) : (
                  <PersonAddOutlined sx={{ color: primaryDark }} />
               )}
            </IconButton>
         }
      </FlexBetween>
   );
};

export default Friend;