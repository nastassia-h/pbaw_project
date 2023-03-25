import { Typography, Box, IconButton, useTheme, Link } from '@mui/material'
import {
   FavoriteBorderOutlined,
   FavoriteOutlined,
   DeleteOutlined,
} from "@mui/icons-material";
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axiosClient from '../../axios-client'
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import { setPost } from '../../store';

const CommentWidget = ({ postComment, onCommentDelete }) => {

   const {
      id,
      user_id,
      comment,
      created_at,
      likes
   } = postComment

   const [user, setUser] = useState(null)
   const mode = useSelector(state => state.mode)

   const loggedInUserId = useSelector((state) => state.user.id);
   const [postLikes, setPostLikes] = useState([...likes])
   const isLiked = Boolean(postLikes.includes(loggedInUserId));
   const likeCount = Object.keys(postLikes).length;

   const patchLike = () => {
      axiosClient.patch(`/comment/${id}`)
         .then(() => {
            if (postLikes.includes(loggedInUserId)) {
               const newPostLikes = postLikes.filter(userLike => userLike !== loggedInUserId)
               setPostLikes(newPostLikes)
            } else {
               setPostLikes([...postLikes, loggedInUserId])
            }
         })
         .catch(() => { })
   }

   useEffect(() => {
      axiosClient.get(`/user/${user_id}`)
         .then(({ data }) => {
            setUser(data)
         })
   }, [postComment])

   if (!user) return null;

   return (
      <Box mt="0.5rem" display='flex' flexDirection='column'>
         <Box display='flex' gap='0.7rem'>
            <Box>
               <UserImage size='15' image={user?.image_path} />
            </Box>
            <Box flex='1 1 auto' sx={{ backgroundColor: mode === "dark" ? 'darkgrey' : '#c7edfe' }} p="0.5rem" borderRadius="10px">
               <Link fontSize='10px' color='#fff' style={{ textDecoration: 'none' }} href={`/profile/${user_id}`}>{`${user?.first_name} ${user?.last_name}`}</Link>
               <Typography fontSize='12px'>{comment}</Typography>
            </Box>
         </Box>
         <Box alignSelf='end'>
            <FlexBetween gap="1rem">
               <FlexBetween gap="0.3rem">
                  <IconButton onClick={patchLike} >
                     {isLiked ? (
                        <FavoriteOutlined sx={{ color: 'primary' }} />
                     ) : (
                        <FavoriteBorderOutlined />
                     )}
                  </IconButton>
                  <Typography marginRight="0.5rem" fontSize={10}>{likeCount}</Typography>
                  {loggedInUserId === user?.id && <IconButton onClick={() => onCommentDelete(id)}><DeleteOutlined color="error" /></IconButton>}
               </FlexBetween>
            </FlexBetween>
         </Box>
      </Box>
   )
}

export default CommentWidget