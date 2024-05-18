import { useState } from "react"
import { Box, Typography, useTheme } from "@mui/material"
import Friend from "../../../components/adminPanel/Friend"
import WidgetWrapper from "../../../components/WidgetWrapper"
import { MoreHorizOutlined } from "@mui/icons-material"

const FriendsListWidget = ({ user }) => {
   const [friendListState, setFriendListState] = useState(user.friend_list);
   const { palette } = useTheme();

   const removeFriend = (friendIdToRemove) => {
      const updatedFriendList = friendListState.filter(friendId => friendId !== friendIdToRemove);
      setFriendListState(updatedFriendList);
    };

   return (
      <WidgetWrapper flex={1}>
         <Typography color={palette.primary.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>Friend List</Typography>
         <Box display="flex" flexDirection="column" gap="1.5rem">
            {friendListState && (friendListState.map(friend =>
               <Friend key={friend} userId={user.id} friendId={friend} removeFriend={removeFriend}/>
            ))}
            <MoreHorizOutlined sx={{ color: palette.primary.dark }} style={{ alignSelf: "center" }} />
         </Box>
      </WidgetWrapper>
   )
}

export default FriendsListWidget