import React from 'react'
import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Link } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { setLogin } from 'state'
//import Dropzone from 'react-dropzone'

const loginSchema = yup.object().shape({
   email: yup.string().email("invalid email").required("required"),
   password: yup.string().required("required"),
})

const initialValuesLogin = {
   email: "",
   password: "",
}

const Login = () => {

   const { palette } = useTheme()
   //const dispatch = useDispatch()
   const navigate = useNavigate()
   const isNonMobile = useMediaQuery("(min-width:600px)")

   const login = async (values, onSubmitProps) => {
      // const loggedUserResponse = await fetch(
      //    "http://localhost:3001/auth/login",
      //    {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(values),
      //    }
      // )
      // const loggedIn = await loggedUserResponse.json()
      // onSubmitProps.resetForm()
      // if (loggedIn) {
      //    dispatch(
      //       setLogin({
      //          user: loggedIn.user,
      //          token: loggedIn.token,
      //       })
      //    )
      //    navigate("/homepage")
      // }
   }

   const handleFormSubmit = async (values, onSubmitProps) => {
      // await login(values, onSubmitProps)
   }

   return (
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
                  <Link
                     href='/signup'
                     sx={{
                        textDecoration: "underline",
                        color: palette.primary.main,
                        "&:hover": {
                           cursor: "pointer",
                           color: palette.primary.light,
                        },
                     }}
                  >
                     Dont't have an account? Sing Up here
                  </Link>
               </Box>
            </form>
         )}
      </Formik>
   )
}

export default Login