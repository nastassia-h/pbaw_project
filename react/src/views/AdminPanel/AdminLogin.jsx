import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery, useTheme, Link, Alert } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { setUser, setToken, setRoles } from '../../store/index.js'
import axiosClient from '../../axios-client.js'

const loginSchema = yup.object().shape({
   email: yup.string().email("invalid email").required("required"),
   password: yup.string().required("required"),
})

const initialValuesLogin = {
   email: "",
   password: "",
}

const AdminLogin = () => {

   const { palette } = useTheme()
   const dispatch = useDispatch()
   const isNonMobile = useMediaQuery("(min-width:600px)")
   const [errors, setErrors] = useState(null)

   const login = (values, onSubmitProps) => {
      setErrors(null)
      axiosClient.post('/adminlogin', values)
         .then(({ data }) => {
            dispatch(setUser({ user: data.user }))
            dispatch(setToken({ token: data.token }))
            dispatch(setRoles({ roles: data.roles }))
         })
         .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
               console.log(response.data.errors)
               setErrors(response.data.errors)
            }
         })
      onSubmitProps.resetForm()
   }

   const handleFormSubmit = (values, onSubmitProps) => {
      login(values, onSubmitProps)
   }

   return (
      <>
         <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
         >
            {({
               values,
               errors,
               touched,
               handleBlur,
               handleChange,
               handleSubmit,
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
                        LOGIN
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

   )
}

export default AdminLogin