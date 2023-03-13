import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/index.js";
import PostWidget from "./PostWidget";
import axiosClient from "../../axios-client.js";

const PostsWidget = ({ userId, isProfile = false }) => {
   const dispatch = useDispatch();
   const posts = useSelector((state) => state.posts);

   const getPosts = async () => {
      axiosClient.get(`/post`)
         .then(({ data }) => {
            dispatch(setPosts({ posts: data.data }))
         })
   };

   const getUserPosts = async () => {
      axiosClient.get(`/posts/${userId}`)
         .then(({ data }) => {
            dispatch(setPosts({ posts: data.data }))
         })
   };

   useEffect(() => {
      if (isProfile) {
         getUserPosts();
      } else {
         getPosts();
      }
   }, []);

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
               />
            )
         )}
      </>
   );
};


export default PostsWidget