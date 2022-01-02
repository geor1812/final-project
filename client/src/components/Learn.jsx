import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Box,
  CardMedia,
  Card,
  Typography,
  Button,
} from '@mui/material'

const Learn = () => {
  const [pageNumber, setPageNumber] = useState(0)
  // const [text1, setText1] = useState()

  let navigate = useNavigate()
  let pageContent = [
    {
      mainText: `Newbie Steps core component is a "step sequencer", a common tool
      you will come across on almost all digital audio workstations.
      In a step sequencer, horizontal placement determines at which
      point in the loop the sound plays and vertical location
      determines the pitch of the note.`,
      secondText: `                Though not necessary to using it, understanding rhythm
      subdivisions is helpful, so here is a brief explanation: If you
      imagine yourself tapping your foot along to a song, generally
      the time between each tap is a beat. Typically, 4 beats make a
      bar. If you split the beat into 4 you get 1/16th of a bar so we
      call this division a 16th note. Our step sequencer is 2 bars
      long, giving you 8 beats and 32 16th notes.`,
      image: '/subdivisions.png',
      buttonText: 'Next Page',
    },
    {
      mainText: `Something not so common to see in a step sequencer is a scale selector. A scale is a set of pitches(notes) and the distance between these pitches 
      give a particular sound. By default, the sequencer displays a chromatic scale, ie every note on a piano. Selecting a scale will highlight
      only the notes in that scale, making it easier to develop a musical sounding melody. Different scales have different emotional impacts on the
      listener. Try out some different scales and see which ones you like the sound of.`,
      secondText: ``,
      image: '/scale-selector.png',
      buttonText: 'Next Page',
    },
    {
      mainText: `The toolbar also contains an instrument selector, pause button, upload button and a BPM selector. BPM (beats per minute) refers to the tempo of a song, the higher the bpm the faster the song.`,
      secondText: ``,
      image: '/toolbar.png',
      buttonText: 'Next Page',
    },
    {
      mainText: `Newbie Steps is a collaborative app, users create songs by layering on top of other users ideas.`,
      secondText: `The timeline shows all these ideas/tracks, from here you can play a song, see the users that worked on it or add your own layer`,
      image: '/timeline.png',
      buttonText: 'Next Page',
    },
    {
      mainText: `When you choose to contribute to a track, the notes that are activated in previous layers are indicated with a small coloured box.`,
      secondText: `This is a useful tool for creating melodies that compliment each other. You can try landing on the same notes at times or creating chords built up of different instruments
      but most of all, remember to use your ears. Have Fun!`,
      image: '/layers.png',
      buttonText: 'Start',
    },
  ]

  let currentPage = pageContent[pageNumber]

  const nextPage = () => {
    if (pageNumber === pageContent.length - 1) {
      navigate('/timeline')
      setPageNumber(0)
    }
    setPageNumber(pageNumber + 1)
  }
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
                {currentPage.mainText}
              </Typography>
              <Typography sx={{ mt: '15px' }} variant="p">
                {currentPage.secondText}
              </Typography>

              <Box display="flex" justifyContent="center" alignItems="center">
                <CardMedia
                  component="img"
                  sx={{
                    padding: '6px',
                    width: '600px',
                    mt: '50px',
                    ml: '15px',
                    alignSelf: 'center',
                  }}
                  image={currentPage.image}
                />
                <Button
                  sx={{
                    width: '50%',
                    mt: '70px',
                  }}
                  color="secondary"
                  variant="contained"
                  onClick={nextPage}
                >
                  <Typography variant="h5">{currentPage.buttonText}</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  )
}

export default Learn
