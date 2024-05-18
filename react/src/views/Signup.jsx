import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Link, Alert, Avatar, Stack } from '@mui/material'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone'
import FlexBetween from '../components/FlexBetween'
import axiosClient from '../axios-client.js'
import { setRoles, setToken, setUser } from '../store'

const registerSchema = yup.object().shape({
   first_name: yup.string().required("required"),
   last_name: yup.string().required("required"),
   email: yup.string().email("invalid email").required("required"),
   password: yup.string().required("required"),
   password_confirmation: yup.string().required("required"),
   location: yup.string().required("required"),
   occupation: yup.string().required("required"),
   picture: yup.string(),
})

const initialValuesRegister = {
   first_name: "",
   last_name: "",
   email: "",
   password: "",
   password_confirmation: "",
   location: "",
   occupation: "",
   picture: "",
}

const Signup = () => {
   const { palette } = useTheme()
   const dispatch = useDispatch()
   const isNonMobile = useMediaQuery("(min-width:600px)")
   const [errors, setErrors] = useState(null)
   const [image, setImage] = useState({
      imageFile: null,
      imagePath: ""
   })

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

   const register = (values, onSubmitProps) => {
      setErrors(null)
      const formData = new FormData()
      for (let value in values) {
         formData.append(value, values[value])
      }
      formData.append('image_path', image.imagePath)

      axiosClient.post('/signup', formData)
         .then(({ data }) => {
            dispatch(setUser({ user: data.user }))
            dispatch(setRoles({ roles: data.roles }))
            dispatch(setToken({ token: data.token }))
         })
         .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
               console.log(response.data.errors)
               setErrors(response.data.errors)
            }
         })

      // onSubmitProps.resetForm()
   }

   const handleFormSubmit = (values, onSubmitProps) => {
      register(values, onSubmitProps)
   }

   return (
      <>
         <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegister}
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
               resetForm,
            }) => (
               <form onSubmit={handleSubmit}>
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
                        border={`1px solid ${palette.primary.dark}`}
                        borderRadius="5px"
                        p="1rem"
                     >
                        <Dropzone
                           acceptedFiles=".jpg,.jpeg,.png"
                           multiple={false}
                           onDrop={acceptedFiles => { setFieldValue("picture", acceptedFiles[0]); onImageChoose(acceptedFiles[0]) }}
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
                                    {!values.picture?.name ? (
                                       <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                          <p><EditOutlinedIcon /></p>
                                          <p>Add Picture Here</p>
                                       </Stack>
                                    ) : (
                                       <Box display={'flex'} width={'100%'} justifyContent="space-between" alignItems="center">
                                          <Avatar sx={{ width: 70, height: 70 }} src={image.imagePath} />
                                          <Stack direction="row" spacing={2} justifyContent="center" alignItems="top">
                                             <Typography>{values.picture.name}</Typography>
                                             <p><EditOutlinedIcon /></p>
                                          </Stack>
                                       </Box>
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
                  <Box>
                     <Button
                        fullWidth
                        type="submit"
                        sx={{
                           m: "2rem 0",
                           p: "1rem",
                           backgroundColor: palette.primary.main,
                           color: palette.background.alt,
                           "&:hover": { color: palette.primary.main },
                        }}
                     >
                        REGISTER
                     </Button>
                     <Link
                        href='/login'
                        sx={{
                           textDecoration: "underline",
                           color: palette.primary.main,
                           "&:hover": {
                              cursor: "pointer",
                              color: palette.primary.light,
                           },
                        }}
                     >
                        Already have an account? Login here
                     </Link>
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
   )
}

export default Signup