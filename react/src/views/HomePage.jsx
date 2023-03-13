import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from './widgets/UserWidget'
import MyPostWidget from './widgets/MyPostWidget'
import PostsWidget from './widgets/PostsWidget'
// import AdvertWidget from 'scenes/widgets/AdvertWidget'
import FriendsListWidget from './widgets/FriendsListWidget'

const HomePage = () => {
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
   const { id, image_path } = useSelector(state => state.user)
   return (
      <Box
         width="100%"
         padding="2rem 6%"
         display={isNonMobileScreen ? "flex" : "block"}
         gap="0.5rem"
         justifyContent="space-between"
      >
         <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
            <UserWidget userId={id} picturePath={image_path} />
         </Box>
         <Box display={'grid'} gap={'2rem'} flexBasis={isNonMobileScreen ? "42%" : undefined}
            mt={isNonMobileScreen ? undefined : "2rem"}
         >
            <MyPostWidget picturePath={image_path} />
            <PostsWidget userId={id} />
         </Box>
         {isNonMobileScreen && (
            <Box flexBasis="26%">
               {/* <AdvertWidget /> */}
               <Box m="2rem 0"><FriendsListWidget userId={id} /></Box>
            </Box>
         )}
      </Box>
   )
}

export default HomePage