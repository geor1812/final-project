import { createTheme } from '@mui/material'
import { orange } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: orange[500],
    },
  },
})

export default theme
