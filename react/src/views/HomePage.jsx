import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from './widgets/UserWidget'
import MyPostWidget from './widgets/MyPostWidget'
import PostsWidget from './widgets/PostsWidget'
import AdvertWidget from './widgets/AdvertWidget'
import FriendsListWidget from './widgets/FriendsListWidget'

const HomePage = () => {
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
   const user = useSelector(state => state.user)
   return (
      <Box
         width="100%"
         padding="2rem 6%"
         display={isNonMobileScreen ? "flex" : "block"}
         gap="0.5rem"
         justifyContent="space-between"
      >
         <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
            <Box
               position={isNonMobileScreen ? "sticky" : undefined}
               top={isNonMobileScreen ? "1rem" : undefined}
            >
               <UserWidget userId={user.id} user={user} />
            </Box>
         </Box>
         <Box display={'grid'} gap={'2rem'} flexBasis={isNonMobileScreen ? "42%" : undefined}
            mt={isNonMobileScreen ? undefined : "2rem"}
         >
            <MyPostWidget picturePath={user.image_path} />
            <PostsWidget userId={user.id} />
         </Box>
         {isNonMobileScreen && (
            <Box flexBasis="26%">
               <Box 
                  position="sticky" 
                  top="1rem"
                  display="grid"
                  gap="2rem"
               >
                  {/* <AdvertWidget /> */}
                  <FriendsListWidget friendList={user.friend_list} />
               </Box>
            </Box>
         )}
      </Box>
   )
}

export default HomePage