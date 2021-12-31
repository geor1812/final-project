import React from 'react'
import {
  Container,
  Box,
  CardMedia,
  Card,
  Typography,
  Button,
} from '@mui/material'

const Home = () => {
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
                  Learn
                </Typography>
              </Box>

              <Typography sx={{ mt: '15px' }} variant="p">
                Newbie Steps core component is a "step sequencer", a common tool
                you will come across on almost all digital audio workstations.
                In a step sequencer, horizontal placement determines at which
                point in the loop the sound plays and vertical location
                determines the pitch of the note.
              </Typography>
              <Typography sx={{ mt: '15px' }} variant="p">
                Though not necessary to using it, understanding rhythm
                subdivisions is helpful, so here is a brief explanation: If you
                imagine yourself tapping your foot along to a song, generally
                the time between each tap is a beat. Typically, 4 beats make a
                bar. If you split the beat into 4 you get 1/16th of a bar so we
                call this division a 16th note. Our step sequencer is 2 bars
                long, giving you 8 beats and 32 16th notes.
              </Typography>
              <CardMedia
                component="img"
                sx={{
                  padding: '6px',
                  width: '800px',
                  mt: '50px',
                  ml: '15px',
                  alignSelf: 'center',
                }}
                image="/subdivisions.png"
              />
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  sx={{
                    width: '50%',
                    mt: '70px',
                  }}
                  color="secondary"
                  variant="contained"
                  href="/sequencer"
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
