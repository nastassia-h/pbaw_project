import {
   ManageAccountsOutlined,
   EditOutlined,
   LocationOnOutlined,
   WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useSelector, useDispatch } from "react-redux";

const UserWidget = ({ userId, picturePath }) => {
   const [user, setUser] = useState(null);
   const currentUser = useSelector(state => state.user)
   const { palette } = useTheme();
   const navigate = useNavigate();
   const dark = palette.primary.dark;
   const medium = palette.primary.medium;
   const main = palette.primary.main;

   const getUser = async () => {
      axiosClient.get(`/user/${userId}`)
         .then(({ data }) => {
            setUser(data)
         })
         .catch(() => {
         })
   };

   useEffect(() => {
      getUser();
   }, []);

   if (!user) {
      return null;
   }

   const {
      first_name,
      last_name,
      location,
      occupation,
      //image_path,
      //viewedProfile,
      //impressions,
      friend_list,
   } = user;

   return (
      <WidgetWrapper>
         {/* FIRST ROW */}
         <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
         >
            <FlexBetween gap="1rem">
               <UserImage image={picturePath} />
               <Box>
                  <Typography
                     variant="h4"
                     color={dark}
                     fontWeight="500"
                     sx={{
                        "&:hover": {
                           color: palette.primary.light,
                           cursor: "pointer",
                        },
                     }}
                     onClick={() => navigate(`/profile/${userId}`)}
                  >
                     {first_name} {last_name}
                  </Typography>
                  <Typography color={medium}>{friend_list.length} friends</Typography>
               </Box>
            </FlexBetween>
            {user.id === currentUser.id &&
               <ManageAccountsOutlined color={dark}
                  onClick={() => navigate('/homepage/edit')}
                  sx={{
                     "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                     },
                  }}
               />
            }
         </FlexBetween>

         <Divider />

         {/* SECOND ROW */}
         <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
               <LocationOnOutlined fontSize="large" sx={{ color: main }} />
               <Typography color={medium}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
               <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
               <Typography color={medium}>{occupation}</Typography>
            </Box>
         </Box>

         <Divider />

         {/* THIRD ROW */}
         <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
               <Typography color={medium}>Who's viewed profile</Typography>
               <Typography color={main} fontWeight="500">
                  {/* {viewedProfile} */}
                  238676
               </Typography>
            </FlexBetween>
            <FlexBetween>
               <Typography color={medium}>Impressions of posts</Typography>
               <Typography color={main} fontWeight="500">
                  {/* {impressions} */}
                  2546
               </Typography>
            </FlexBetween>
         </Box>
      </WidgetWrapper>
   );
};

export default UserWidget