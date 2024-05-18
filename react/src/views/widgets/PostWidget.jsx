import {
   ChatBubbleOutlineOutlined,
   FavoriteBorderOutlined,
   FavoriteOutlined,
   ShareOutlined,
   DeleteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Dialog, DialogTitle, Button, FormControl, FormLabel, Input } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setComment } from "../../store/index.js";
import axiosClient from "../../axios-client.js"
import CommentWidget from "./CommentWidget";

const PostWidget = ({
   postId,
   postUserId,
   name,
   description,
   location,
   picturePath,
   userPicturePath,
   likes,
   comments,
   onDeleteClick
}) => {
   const [isComments, setIsComments] = useState(false);
   const commentRef = useRef()
   const dispatch = useDispatch();
   const loggedInUserId = useSelector((state) => state.user.id);
   const isLiked = Boolean(likes.includes(loggedInUserId));
   const likeCount = Object.keys(likes).length;
   const [open, setOpen] = useState(false);
   const [postComments, setPostComments] = useState([...comments])

   const posts = useSelector(state => state.posts)
   const currentPost = posts.filter(post => post.id === postId);

   const { palette } = useTheme();
   const main = palette.primary.main;
   const primary = palette.primary.main;

   const patchLike = () => {
      axiosClient.patch(`/post/${postId}/like`)
         .then(({ data }) => {
            dispatch(setPost({ post: data }));
         })
         .catch(() => { })
   };

   const onCommentDelete = (commentId) => {
      axiosClient.delete(`/comment/${commentId}`).then(() => {
         setPostComments(postComments.filter(comment => comment.id !== commentId))
         // dispatch(setComment({ comment: { post_id: postId, postComments } }));
      });
   }

   const sendComment = () => {

      const formData = new FormData()

      formData.append('post_id', postId)
      formData.append('comment', commentRef.current.value)

      axiosClient.post(`/comment`, formData)
         .then(({ data }) => {
            setPostComments([...postComments, data])
            dispatch(setComment({ comment: data }));
            commentRef.current.value = ""
         })
         .catch(() => { })
   }

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };


   return (
      <WidgetWrapper mb="0.5rem">
         <Dialog
            onClose={handleClose}
            open={open}>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <Box display='flex' justifyContent='space-between' p="1rem">
               <Button variant="text" color="primary" onClick={handleClose}>Cancel</Button>
               <Button variant="outlined" color="error" onClick={() => { handleClose(); onDeleteClick(postId) }}>Delete</Button>
            </Box>
         </Dialog>
         <Box display={loggedInUserId === postUserId ? 'flex' : ''} justifyContent='space-between' alignItems='center'>
            <Friend
               friendId={postUserId}
               name={name}
               subtitle={location}
               userPicturePath={userPicturePath}
            />
            {loggedInUserId === postUserId &&
               <IconButton
                  onClick={handleClickOpen}
                  sx={{ width: "30", marginLeft: '10px' }}
               >
                  <DeleteOutlined color={'error'} />
               </IconButton>
            }
         </Box>
         <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
         </Typography>
         {picturePath && (
            <img
               width="100%"
               height="auto"
               alt="post"
               style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
               src={picturePath}
            />
         )}
         <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
               <FlexBetween gap="0.3rem">
                  <IconButton onClick={patchLike}>
                     {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                     ) : (
                        <FavoriteBorderOutlined />
                     )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
               </FlexBetween>

               <FlexBetween gap="0.3rem">
                  <IconButton onClick={() => setIsComments(!isComments)}>
                     <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{postComments.length}</Typography>
               </FlexBetween>
            </FlexBetween>

            <IconButton>
               <ShareOutlined />
            </IconButton>
         </FlexBetween>
         {isComments && (
            <Box mt="0.5rem" mb="1rem">
               <FormControl fullWidth>
                  <FormLabel style={{ marginBottom: "0.5rem" }}>Your comment</FormLabel>
                  <Box display='grid' gap="1rem">
                     <Input
                        inputRef={commentRef}
                        placeholder="Type something here…"
                     />
                     <Button onClick={sendComment} style={{ width: "3rem", justifySelf: "end" }} variant='outlined' color='primary'>Send</Button>
                  </Box>
               </FormControl>
               {postComments.map((comment, i) =>
                  <CommentWidget onCommentDelete={onCommentDelete} postComment={comment} key={i} />
               )}
            </Box>
         )}
      </WidgetWrapper>
   );
};

export default PostWidget;