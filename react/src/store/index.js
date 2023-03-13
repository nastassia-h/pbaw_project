import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   mode: "light",
   user: null,
   token: null,
   posts: [],
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
      setToken: (state, action) => {
         state.token = action.payload.token;
         localStorage.setItem('ACCESS_TOKEN', action.payload.token)
      },
      setFriends: (state, action) => {
         if (state.user) {
            state.user.friends = action.payload.friends;
         } else {
            console.error("user friend non-existent :(")
         }
      },
      setPosts: (state, action) => {
         state.posts = action.payload.posts
      },
      setPost: (state, action) => {
         const updatedPosts = state.posts.map(post => {
            if (post._id === action.payload.post._id) return action.payload.post
            return post;
         })
         state.posts = updatedPosts
      }
   }
})

export const { setMode, setToken, setLogout, setUser, setFriends, setPost, setPosts } = authSlice.actions
export default authSlice.reducer