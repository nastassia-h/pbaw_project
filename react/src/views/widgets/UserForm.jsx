import { useState, useEffect } from 'react'
import { Box, Button, TextField, useMediaQuery, Stack, Typography, useTheme, Alert, Avatar } from '@mui/material'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik } from 'formik'
import * as yup from 'yup'
import Dropzone from 'react-dropzone'
import FlexBetween from '../../components/FlexBetween'
import axiosClient from '../../axios-client.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/index.js'

const registerSchema = yup.object().shape({
   first_name: yup.string().required("required"),
   last_name: yup.string().required("required"),
   email: yup.string().email("invalid email").required("required"),
   password: yup.string(),
   password_confirmation: yup.string(),
   location: yup.string().required("required"),
   occupation: yup.string().required("required"),
   picture: yup.string(),
})

const UserForm = () => {
   const currentUser = useSelector(state => state.user)
   const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
   const { palette } = useTheme()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const isNonMobile = useMediaQuery("(min-width:600px)")
   const [errors, setErrors] = useState(null)
   const [updatedUser, setUpdatedUser] = useState({
      ...currentUser,
      image: null,
      password: "",
      password_confirmation: ""
   })

   const onImageChoose = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
         setUpdatedUser({
            ...updatedUser,
            image: file,
            image_url: reader.result,
         });
      };
      reader.readAsDataURL(file);
   };

   const update = (values, onSubmitProps) => {
      setErrors(null)
      const payload = { ...values }

      if (updatedUser.image) {
         delete payload.image;
         payload.image_path = updatedUser.image_url;
         delete payload.image_url;
      } else {
         delete payload.image_path
         delete payload.image;
         delete payload.image_url
      }

      if (!payload.password) {
         delete payload.password
         delete payload.password_confirmation
      }

      axiosClient.put(`/user/${currentUser.id}`, payload)
         .then(({ data }) => {
            dispatch(setUser({ user: data }))
            navigate('/homepage')
         })
         .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
               setErrors(response.data.errors)
            }
         })
   }

   const handleFormSubmit = (values, onSubmitProps) => {
      update(values, onSubmitProps)
   }

   return (
      <Box width={isNonMobileScreen ? "50%" : "95%"} p="1rem" m="1.5rem auto" borderRadius="1.5rem" textAlign={'center'}>
         <>
            <Formik
               onSubmit={handleFormSubmit}
               initialValues={updatedUser}
               validationSchema={registerSchema}
            >
               {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
               }) => (
                  <form onSubmit={handleSubmit} method="POST">
                     <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                           "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                     >
                        <TextField
                           label="First Name"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.first_name}
                           name="first_name"
                           error={Boolean(touched.first_name) && Boolean(errors.first_name)}
                           helperText={touched.first_name && errors.first_name}
                           sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                           label="Last Name"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.last_name}
                           name="last_name"
                           error={Boolean(touched.last_name) && Boolean(errors.last_name)}
                           helperText={touched.last_name && errors.last_name}
                           sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                           label="Location"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.location}
                           name="location"
                           error={Boolean(touched.location) && Boolean(errors.location)}
                           helperText={touched.location && errors.location}
                           sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                           label="Occupation"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.occupation}
                           name="occupation"
                           error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                           helperText={touched.occupation && errors.occupation}
                           sx={{ gridColumn: "span 4" }}
                        />
                        <Box
                           gridColumn="span 4"
                           //gridRow="span 4"
                           border={`1px solid ${palette.primary.dark}`}
                           borderRadius="5px"
                           p="1rem"
                        >
                           <Dropzone
                              acceptedFiles=".jpg,.jpeg,.png"
                              multiple={false}
                              onDrop={(acceptedFiles) => {
                                 setFieldValue("picture", acceptedFiles[0]);
                                 onImageChoose(acceptedFiles[0])
                              }}
                           >
                              {({ getRootProps, getInputProps }) => (
                                 <Box
                                    {...getRootProps()}
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                 >
                                    <input {...getInputProps()} />
                                    <Box
                                       display='flex'
                                       justifyContent='space-between'
                                       alignItems='center'
                                    >
                                       <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                          <p><EditOutlinedIcon /></p>
                                          <p>Change Picture Here</p>
                                       </Stack>
                                       {updatedUser.image_path && !updatedUser.image_url ? (
                                          <Avatar sx={{ width: 70, height: 70 }} src={updatedUser.image_path && `${import.meta.env.VITE_API_BASE_URL}/${updatedUser.image_path}`} />
                                       ) : (updatedUser.image_url ?
                                          <Avatar sx={{ width: 70, height: 70 }} src={updatedUser.image_url} />
                                          :
                                          <Avatar sx={{ width: 70, height: 70, backgroundColor: 'black' }} />
                                       )}
                                    </Box>
                                 </Box>
                              )}
                           </Dropzone>
                        </Box>
                        <TextField
                           label="Email"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.email}
                           name="email"
                           error={Boolean(touched.email) && Boolean(errors.email)}
                           helperText={touched.email && errors.email}
                           sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                           label="Password"
                           type="password"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.password}
                           name="password"
                           error={Boolean(touched.password) && Boolean(errors.password)}
                           helperText={touched.password && errors.password}
                           sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                           label="Password Comfirmation"
                           type="password"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.password_confirmation}
                           name="password_confirmation"
                           error={Boolean(touched.password) && Boolean(errors.password)}
                           helperText={touched.password && errors.password}
                           sx={{ gridColumn: "span 4" }}
                        />
                     </Box>
                     {/* Buttons */}
                     <Box
                        display='flex'
                        justifyContent={'flex-end'}
                        gap='20px'
                     >
                        <Button
                           type="submit"
                           sx={{
                              width: '100px',
                              m: "2rem 0",
                              p: "1rem",
                              backgroundColor: palette.primary.main,
                              color: palette.background.alt,
                              "&:hover": { color: palette.primary.main },
                           }}
                        >
                           Save
                        </Button>
                        <Button
                           onClick={() => navigate('/homepage')}
                           variant="outlined"
                           color="error"
                           sx={{
                              width: '100px',
                              m: "2rem 0",
                              p: "1rem",
                           }}
                        >
                           Cancel
                        </Button>
                     </Box>
                  </form>
               )}
            </Formik>
            &nbsp;
            {errors && <Alert variant="outlined" severity="error">
               {Object.keys(errors).map(key =>
                  <p key={key}>{errors[key][0]}</p>
               )}
            </Alert>}
         </>
      </Box>
   )
}

export default UserForm