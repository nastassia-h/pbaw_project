import { Typography, useTheme, Box } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import WidgetWrapper from "../../components/WidgetWrapper"


const AdvertWidget = () => {
   const { palette } = useTheme()
   const dark = palette.primary.dark;
   const main = palette.primary.main;
   const medium = palette.primary.medium;


   return (
      <WidgetWrapper>
         <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
               Sponsored
            </Typography>
            <Typography color={medium}>
               Create Ad
            </Typography>
         </FlexBetween>
         <img
            width="100%"
            height="auto"
            alt="advert"
            src={'http://localhost:3000/src/assets/photo.jpg'}
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
         />
         <Box >
            <Typography color={main}>
               MikaCosmetics
            </Typography>
            <Typography color={medium}>
               mikacosmetics.com
            </Typography>
            <Typography color={medium} m="0.5rem 0">
               Your path to stunning and immaculate beauty
            </Typography>
         </Box>
      </WidgetWrapper>
   )
}

export default AdvertWidget