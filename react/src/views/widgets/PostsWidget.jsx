import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/index.js";
import PostWidget from "./PostWidget";
import axiosClient from "../../axios-client.js";

const PostsWidget = ({ userId, isProfile = false }) => {
   const dispatch = useDispatch();
   const posts = useSelector((state) => state.posts);
   const [loading, setLoading] = useState(false)

   const getPosts = async () => {
      setLoading(true)
      axiosClient.get(isProfile ? `/posts/${userId}` : `/post`)
         .then(({ data }) => {
            dispatch(setPosts({ posts: data.data }))
            setLoading(false)
         })
         .catch(() => {
            setLoading(false)
         })
   };

   const onDeleteClick = (postId) => {
      axiosClient.delete(`/post/${postId}`).then(() => {
         getPosts()
      });
   }

   useEffect(() => {
      getPosts();
   }, []);

   if (loading) return (
      <Box
         width="100%"
         textAlign="center"
      >
         <CircularProgress/>
      </Box>
   )

   if (posts.length == 0) return (
      <Box
         width="100%"
         textAlign="center"
      >
         <Typography
            fontWeight="bold"
            fontSize="18px"
            color="primary"
         >Posts haven't been created yet...</Typography>
      </Box>
   )

   return (
      <>
         {posts.map(
            ({
               id,
               user_id,
               user,
               description,
               image_path,
               likes,
               comments,
            }) => (
               <PostWidget
                  key={id}
                  postId={id}
                  postUserId={user_id}
                  name={`${user.first_name} ${user.last_name}`}
                  description={description}
                  location={user.location}
                  picturePath={image_path}
                  userPicturePath={user.image_path}
                  likes={likes}
                  comments={comments}
                  onDeleteClick={onDeleteClick}
               />
            )
         )}
      </>
   );
};


export default PostsWidget