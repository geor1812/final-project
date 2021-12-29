import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Button,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import NotesIcon from '@mui/icons-material/Notes'
import * as Tone from 'tone'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const DEFAULT_PICTURE_URL = '/neon.png'

const TrackCard = ({
  track,
  handlePlay,
  changeCurrentTrack,
  handlePause,
  handleDelete,
  deletePermission,
}) => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const [paused, setPaused] = useState(true)

  const handleExpand = () => {
    if (expanded === true) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  const playPauseIcons = () => {
    if (paused) {
      return <PlayArrowIcon color="primary" sx={{ height: 38, width: 38 }} />
    } else {
      return <PauseIcon color="primary" sx={{ height: 38, width: 38 }} />
    }
  }

  const handlePlayAndChangeTrack = () => {
    if (!paused) {
      // handlePause()
      Tone.Transport.stop()
      setPaused(true)
    } else {
      changeCurrentTrack(track)
      handlePlay()
      setPaused(false)
    }
  }

  const handleUserClick = user => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/accounts/username/${user}`,
    })
      .then(res => {
        navigate(`/user/${res.data.account._id}`)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Card
      sx={{
        maxWidth: '462px',
        boxShadow: '5px 10px 15px 10px #170a1c',
        padding: '6px',
        backgroundColor: '#461e52',
      }}
    >
      <Box sx={{ display: 'flex', backgroundColor: '#461e52' }}>
        <CardMedia
          component="img"
          sx={{
            width: 150,
            height: 150,
            padding: '6px',
            boxShadow: '0px 0px 15px 10px #170a1c',
          }}
          image={track.imgUrl ? track.imgUrl : DEFAULT_PICTURE_URL}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 0px 15px 10px #170a1c',
          }}
        >
          <CardContent
            sx={{
              width: '300px',
              bgcolor: 'background.paper',
            }}
          >
            <Typography component="div" variant="h5">
              {track.title}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`${track.bpm} BPM`}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: 1,
              bgcolor: 'background.paper',
            }}
          >
            <Tooltip title="View layers">
              <IconButton onClick={handleExpand} aria-label="expand">
                <NotesIcon sx={{ height: 20, width: 20 }} />
              </IconButton>
            </Tooltip>

            <IconButton
              onClick={handlePlayAndChangeTrack}
              aria-label="play/pause"
            >
              {playPauseIcons()}
            </IconButton>
            <Link to="/sequencer" state={{ track: track }}>
              <Tooltip title="Contribute">
                <IconButton aria-label="contribute">
                  <AddIcon sx={{ height: 20, width: 20 }} />
                </IconButton>
              </Tooltip>
            </Link>
            {deletePermission ? (
              <Tooltip title="Delete track">
                <IconButton
                  onClick={() => {
                    handleDelete(track._id)
                  }}
                >
                  <CloseIcon sx={{ height: 20, width: 20, color: '#bd0d00' }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            padding: 0,
            bgcolor: 'background.paper',
            boxShadow: '0px 0px 15px 10px #170a1c',
          }}
        >
          {track.layers.map(layer => (
            <List
              sx={{
                maxWidth: '300px',
              }}
            >
              <ListItem sx={{ padding: '0px', pl: '16px' }}>
                <ListItemText
                  primary={layer.name}
                  secondary={
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={() => {
                        handleUserClick(layer.user)
                      }}
                    >
                      {layer.user}
                    </Button>
                  }
                  sx={{ width: '300px' }}
                />
                <ListItemText secondary={layer.instrument} />
              </ListItem>
            </List>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default TrackCard
