import { useState, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';
import router from './router'

function App() {
  //const mode = useSelector(state => state.mode)
  const mode = 'dark'
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
