import React from 'react'
import {
  Container,
  Box,
  CardMedia,
  Card,
  Typography,
  Button,
} from '@mui/material'
import text from '../text'

const Home = token => {
  const buttonHref = token ? '/timeline' : '/auth'

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card
          style={{
            margin: '0px',
            width: '1140px',
            height: '640px',
            boxShadow: '5px 10px 15px 10px #170a1c',
            padding: '6px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <CardMedia
              component="img"
              sx={{ padding: '6px', width: '500px', mt: '50px', ml: '15px' }}
              image="/headphones-primary.png"
            />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                padding: '20px',
                pt: '50px',
                flexDirection: 'column',
              }}
              //justifyContent="center"
              //alignItems="center"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  sx={{ textShadow: '10px 10px 10px #170a1c' }}
                  color="primary"
                  variant="h2"
                >
                  Newbie Steps
                </Typography>
              </Box>

              <Typography sx={{ mt: '15px' }} variant="p">
                {text.homepage.welcome}
              </Typography>
              <Typography sx={{ mt: '15px' }} variant="p">
                {text.homepage.more}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  sx={{
                    width: '50%',
                    mt: '70px',
                  }}
                  color="secondary"
                  variant="contained"
                  href={buttonHref}
                >
                  <Typography variant="h5">Let's go!</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  )
}

export default Home
