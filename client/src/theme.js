import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e58e35',
    },
    secondary: {
      main: '#7a98ee',
    },
    background: {
      default: '#200e26',
      paper: '#461e52',
    },
  },
})

export default theme