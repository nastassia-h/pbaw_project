import {
   EditOutlined,
   DeleteOutlined,
   AttachFileOutlined,
   GifBoxOutlined,
   ImageOutlined,
   MicOutlined,
   MoreHorizOutlined,
} from "@mui/icons-material";
import {
   Box,
   Divider,
   Typography,
   InputBase,
   useTheme,
   Button,
   IconButton,
   useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import axiosClient from '../../axios-client.js'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store";

const MyPostWidget = ({ picturePath }) => {
   const [isImage, setIsImage] = useState(false);
   const [image, setImage] = useState({ imageFile: null, imagePath: "" });
   const [post, setPost] = useState("");
   const posts = useSelector(state => state.posts)
   const dispatch = useDispatch()
   const { palette } = useTheme();
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
   const mediumMain = palette.primary.mediumMain;
   const medium = palette.primary.medium;

   const onImageChoose = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
         setImage({
            imageFile: file,
            imagePath: reader.result,
         });
      };
      reader.readAsDataURL(file);
   };

   const handlePost = async () => {
      const formData = new FormData();
      formData.append("description", post);
      if (image?.imagePath) {
         formData.append("image_path", image.imagePath);
      }

      axiosClient.post('/post', formData)
         .then(({ data }) => {
            dispatch(setPosts({
               posts: [data, ...posts]
            }))
         })
      setPost("")
      setImage(null)
      setIsImage(false)
   };

   return (
      <WidgetWrapper>
         <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase
               placeholder="What's on your mind..."
               onChange={(e) => setPost(e.target.value)}
               value={post}
               sx={{
                  width: "100%",
                  border: `2px solid ${palette.primary.light}`,
                  borderRadius: "2rem",
                  padding: "1rem 2rem",
               }}
            />
         </FlexBetween>
         {isImage && (
            <Box
               border={`1px solid ${medium}`}
               borderRadius="5px"
               mt="1rem"
               p="1rem"
            >
               <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => onImageChoose(acceptedFiles[0])}
               >
                  {({ getRootProps, getInputProps }) => (
                     <FlexBetween>
                        <Box
                           {...getRootProps()}
                           border={`2px dashed ${palette.primary.main}`}
                           p="1rem"
                           width="100%"
                           sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                           <input {...getInputProps()} />
                           {!image?.imagePath ? (
                              <p>Add Image Here</p>
                           ) : (
                              <FlexBetween>
                                 <Typography>{image?.imageFile.name}</Typography>
                                 <EditOutlined />
                              </FlexBetween>
                           )}
                        </Box>
                        {image && (
                           <IconButton
                              onClick={() => setImage(null)}
                              sx={{ width: "30", marginLeft: '10px' }}
                           >
                              <DeleteOutlined />
                           </IconButton>
                        )}
                     </FlexBetween>
                  )}
               </Dropzone>
            </Box>
         )}

         <Divider sx={{ margin: "1.25rem 0" }} />

         <FlexBetween gap="1rem" flexWrap="wrap">
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
               <ImageOutlined sx={{ color: mediumMain }} />
               <Typography
                  color={mediumMain}
                  sx={{ "&:hover": { cursor: "pointer", color: medium } }}
               >
                  Image
               </Typography>
            </FlexBetween>

            {isNonMobileScreens ? (
               <>
                  <FlexBetween gap="0.25rem">
                     <GifBoxOutlined sx={{ color: mediumMain }} />
                     <Typography color={mediumMain}>Clip</Typography>
                  </FlexBetween>

                  <FlexBetween gap="0.25rem">
                     <AttachFileOutlined sx={{ color: mediumMain }} />
                     <Typography color={mediumMain}>Attachment</Typography>
                  </FlexBetween>

                  <FlexBetween gap="0.25rem">
                     <MicOutlined sx={{ color: mediumMain }} />
                     <Typography color={mediumMain}>Audio</Typography>
                  </FlexBetween>
               </>
            ) : (
               <FlexBetween gap="0.25rem">
                  <MoreHorizOutlined sx={{ color: mediumMain }} />
               </FlexBetween>
            )}

            <Button
               disabled={!post}
               onClick={handlePost}
               sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
               }}
            >
               POST
            </Button>
         </FlexBetween>
      </WidgetWrapper>
   )
}

export default MyPostWidget