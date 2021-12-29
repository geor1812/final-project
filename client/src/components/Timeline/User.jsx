import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  CardMedia,
} from '@mui/material'
import TrackCard from './TrackCard'
import * as Tone from 'tone'
import Player from '../player/Player'
import axios from 'axios'
import TimelineIcon from '@mui/icons-material/Timeline'
import text from '../../text'

const User = props => {
  const { token } = props
  const [tracks, setTracks] = useState()
  const [user, setUser] = useState()
  const [currentTrack, setCurrentTrack] = useState()
  const [play, setPlay] = useState(0)
  let navigate = useNavigate()
  const deletePermission = user?._id === token ? true : false

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  })

  const getUser = () => {
    axios({
      method: 'get',
      url: `${
        process.env.REACT_APP_API_URL
      }/accounts/${window.location.pathname.slice(6)}`,
    })
      .then(res => {
        setUser(res.data.account)
        getTracks(res.data.account.username)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getTracks = username => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/tracks/username/${username}`,
    })
      .then(res => {
        setTracks(res.data.tracks)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    Tone.Transport.stop()
    getUser()
  }, [window.location.pathname])

  const handlePlay = () => {
    Tone.start()
    setPlay(play + 1)
  }

  const handlePause = () => {
    Tone.Transport.stop()
  }

  const changeCurrentTrack = track => {
    setCurrentTrack(track)
  }

  const handleTimelineIcon = () => {
    navigate('/timeline')
  }

  const handleDelete = id => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/tracks/${id}`,
    })
      .then(res => {
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Container>
      <Player track={currentTrack} play={play}></Player>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography color="primary" variant="h3">
          {user?.username}
        </Typography>
        <Tooltip title="Go to timeline">
          <IconButton
            color="secondary"
            component="span"
            onClick={handleTimelineIcon}
          >
            <TimelineIcon fontSize="large" color="tertiary" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Box sx={{ width: '1000px' }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={5}
          >
            {tracks && tracks.length !== 0 ? (
              tracks?.map(track => {
                return (
                  <Grid item>
                    <TrackCard
                      deletePermission={deletePermission}
                      track={track}
                      handlePlay={handlePlay}
                      changeCurrentTrack={changeCurrentTrack}
                      handlePause={handlePause}
                      handleDelete={handleDelete}
                    />
                  </Grid>
                )
              })
            ) : (
              <>
                <Grid item>
                  <Typography variant="h5">{text.empty}</Typography>
                  <CardMedia
                    component="img"
                    sx={{ width: '200px', mt: '25px', ml: '45px' }}
                    image="/sad.png"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default User
