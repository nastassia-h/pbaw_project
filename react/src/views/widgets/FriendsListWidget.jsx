import { Box, Typography, useTheme } from "@mui/material"
import Friend from "../../components/Friend"
import WidgetWrapper from "../../components/WidgetWrapper"
import { MoreHorizOutlined } from "@mui/icons-material"

const FriendsListWidget = ({ friendList }) => {
   const { palette } = useTheme();

   return (
      <WidgetWrapper>
         <Typography color={palette.primary.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>Friend List</Typography>
         <Box display="flex" flexDirection="column" gap="1.5rem">
            {friendList && (friendList.slice(0, 5).map(friend =>
               <Friend fetch key={friend} friendId={friend} />
            ))}
            <MoreHorizOutlined sx={{ color: palette.primary.dark }} style={{ alignSelf: "center" }} />
         </Box>
      </WidgetWrapper>
   )
}

export default FriendsListWidget