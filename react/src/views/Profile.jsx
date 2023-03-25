import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "./widgets/FriendsListWidget";
import MyPostWidget from "./widgets/MyPostWidget";
import PostsWidget from "./widgets/PostsWidget";
import UserWidget from "./widgets/UserWidget";
import axiosClient from "../axios-client";

const ProfilePage = () => {
   const [user, setUser] = useState(null);
   const { id } = useParams();
   const meUser = useSelector((state) => state.user)
   const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

   const getUser = async () => {
      axiosClient.get(`/user/${id}`)
         .then(({ data }) => {
            setUser(data)
         })
         .catch(() => {
         })
   };

   useEffect(() => {
      getUser();
   }, []);

   if (!user) return (
      <Box
         width="100%"
         textAlign="center"
      >
         <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
         >Loading...</Typography>
      </Box>
   );

   return (
      <Box
         width="100%"
         padding="2rem 6%"
         display={isNonMobileScreens ? "flex" : "block"}
         gap="2rem"
         justifyContent="center"
      >
         <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={user.id} user={user} />
            <Box m="2rem 0" />
            <FriendListWidget friendList={user.friend_list} />
         </Box>
         <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
         >
            {meUser.id === user.id &&
               <>
                  <MyPostWidget picturePath={user.image_path} />
                  <Box m="2rem 0" />
               </>
            }
            <PostsWidget userId={user.id} isProfile />
         </Box>
      </Box>
   );
};

export default ProfilePage;