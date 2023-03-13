import { Avatar } from "@mui/material";

const UserImage = ({ image, size = "80px" }) => {
   return (
      <Avatar sx={{ objectFit: "cover", borderRadius: "50%", backgroundColor: image ? 'transparent' : 'grey', width: `${size}`, height: `${size}` }} src={image && `${import.meta.env.VITE_API_BASE_URL}/${image}`} >
      </Avatar>
   );
};

export default UserImage;