import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   mode: "light",
   user: null,
   roles: [], 
   token: null,
   posts: [],
   message: "",
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setMode: (state) => {
         state.mode = state.mode === "light" ? "dark" : "light"
      },
      setLogout: (state) => {
         state.user = null;
         state.token = null;
         localStorage.removeItem('ACCESS_TOKEN')
      },
      setUser: (state, action) => {
         state.user = action.payload.user;
      },
      setRoles: (state, action) => {
         state.roles = action.payload.roles;
      },
      setToken: (state, action) => {
         state.token = action.payload.token;
         localStorage.setItem('ACCESS_TOKEN', action.payload.token)
      },
      setFriends: (state, action) => {
         if (state.user) {
            state.user.friend_list = action.payload.friends;
         } else {
            console.error("user friend non-existent :(")
         }
      },
      setPosts: (state, action) => {
         state.posts = action.payload.posts
      },
      setPost: (state, action) => {
         const updatedPosts = state.posts.map(post => {
            if (post.id === action.payload.post.id) return action.payload.post
            return post;
         })
         state.posts = updatedPosts
      },
      setComment: (state, action) => {
         const updatedPosts = state.posts.map(post => {
            if (post.id == action.payload.comment.post_id) return { ...post, comments: [action.payload.comment, ...post.comments] }
            return post;
         })
         state.posts = updatedPosts
      },
      deleteComment: (state, action) => {
         const updatedPosts = state.posts.map(post => {
            if (post.id == action.payload.comment.post_id) return { ...post, comments: [action.payload.comment, ...post.comments] }
            return post;
         })
         state.posts = updatedPosts
      },
      setNotification: (state, action) => {
         state.message = action.payload;
      }
   }
})

export const { setNotification, setMode, setToken, setComment, deleteComment, setLogout, setUser,setRoles, setFriends, setPost, setPosts } = authSlice.actions
export default authSlice.reducer