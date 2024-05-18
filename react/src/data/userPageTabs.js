import React from "react";
import FriendsListWidget from "../views/widgets/AdminPanel/FriendsListWidget";
import UserWidget from "../views/widgets/AdminPanel/UserWidget";
import PostsGrid from "../views/AdminPanel/PostsGrid";

export const data = [
   {
      label: "Info",
      element: UserWidget
   },
   {
      label: "Friend List",
      element: FriendsListWidget
   },
   {
      label: "Posts",
      element: PostsGrid
   }
]