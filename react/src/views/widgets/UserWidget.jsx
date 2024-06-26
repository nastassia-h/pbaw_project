import {
   ManageAccountsOutlined,
   LocationOnOutlined,
   WorkOutlineOutlined,
   PersonAddOutlined, 
   PersonRemoveOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../../axios-client";
import { setFriends } from "../../store";

const UserWidget = ({ userId, user }) => {
   const currentUser = useSelector(state => state.user)
   const friends = useSelector((state) => state.user.friend_list);
   const isFriend = friends?.includes(userId);

   const { palette } = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const dark = palette.primary.dark;
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const medium = palette.primary.medium;
   const main = palette.primary.main;

   const patchFriend = async () => {
      axiosClient.patch(`/user/${currentUser.id}/${userId}`)
         .then(({ data }) => {
            dispatch(setFriends({ friends: data }))
         })
   };

   if (!user) {
      return null;
   }

   const {
      first_name,
      last_name,
      location,
      occupation,
      image_path,
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
               <UserImage image={image_path} />
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
                  <Typography color={medium}>{friend_list ? friend_list.length : 0} friends</Typography>
               </Box>
            </FlexBetween>
            {user.id === currentUser.id ?
               <ManageAccountsOutlined color={dark}
                  onClick={() => navigate('/homepage/edit')}
                  sx={{
                     "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                     },
                  }}
               /> : <IconButton
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
                  3864
               </Typography>
            </FlexBetween>
            <FlexBetween>
               <Typography color={medium}>Impressions of posts</Typography>
               <Typography color={main} fontWeight="500">
                  {/* {impressions} */}
                  127
               </Typography>
            </FlexBetween>
         </Box>
      </WidgetWrapper>
   );
};

export default UserWidget