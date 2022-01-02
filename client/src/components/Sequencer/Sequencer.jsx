import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as Tone from 'tone'
import Note from './Note'
import {
  Slider,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Select,
  Stack,
  IconButton,
  Box,
  Typography,
  Tooltip,
  Card,
  CardContent,
  CardMedia,
  Modal,
} from '@mui/material'
//import LoginIcon from '@mui/icons-material/Login'
import PianoIcon from '@mui/icons-material/Piano'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import instruments from '../player/instruments.js'
import Player from '../player/Player'
import axios from 'axios'
import { Scale, Note as TonalNote } from '@tonaljs/tonal'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import DoneIcon from '@mui/icons-material/Done'
import { BedTwoTone } from '@mui/icons-material'
const DEFAULT_PICTURE_URL = '/neon.png'

const Sequencer = props => {
  const { token, location } = props
  let navigate = useNavigate()

  const { state } = useLocation()
  // console.log(state)
  // const track = false
  // if (state) {
  //   const { track } = state
  // }

  const [paused, setPaused] = useState(false)

  const [buttonArray, setButtonArray] = useState([])
  const [currentTrack, setCurrentTrack] = useState()
  const [numberOfLayers, setNumberOfLayers] = useState()

  const [rootNote, setRootNote] = useState('C')
  const [scaleType, setScaleType] = useState('Chromatic')

  const [title, setTitle] = useState('')
  const [bpm, setBpm] = useState(80)

  const [username, setUsername] = useState('')
  const [layerName, setLayerName] = useState('')
  const [instrument, setInstrument] = useState('beep')
  const [volume, setVolume] = useState(-5)
  const [imgUrl, setImgUrl] = useState()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const notes = [
    'B4',
    'A#4',
    'A4',
    'G#4',
    'G4',
    'F#4',
    'F4',
    'E4',
    'D#4',
    'D4',
    'C#4',
    'C4',
    'B3',
    'A#3',
    'A3',
    'G#3',
    'G3',
    'F#3',
    'F3',
    'E3',
    'D#3',
    'D3',
    'C#3',
    'C3',
  ]

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  })

  useEffect(() => {
    Tone.Transport.stop()
  }, [window.location.pathname])

  useEffect(() => {
    const initialButtonArray = []
    for (let j = 0; j < 25; j++) {
      for (let i = 0; i < 32; i++) {
        initialButtonArray.push({
          step: i,
          note: notes[j],
          activated: false,
          id: i + j * 32,
        })
      }
    }
    setButtonArray(initialButtonArray)

    if (state) {
      setCurrentTrack(state.track)
      setNumberOfLayers(state.track.layers.length)
      setTitle(state.track.title)
      setImgUrl(state.track.imgUrl)
    } else {
      setNumberOfLayers(0)
      setCurrentTrack({
        title: '',
        bpm: bpm,
        layers: [],
      })
    }

    axios({
      method: 'get',
      url: `http://localhost:9000/accounts/${token}`,
    }).then(res => {
      setUsername(res.data.account.username)
    })
  }, [])

  const toggleNoteActivate = e => {
    const newButtonArray = buttonArray.map(note => note)
    const id = e.target.id
    if (newButtonArray[id]) {
      newButtonArray[id].activated = !newButtonArray[id].activated
      setButtonArray(newButtonArray)
    }
  }

  const displayButtons = () => {
    const buttons = []
    let buttonId = 0
    let previouslyActivatedNotes = []

    for (let j = 0; j < 24; j++) {
      const row = []
      let note = notes[j].slice(0, -1)
      note = TonalNote.simplify(note)
      let scale = Scale.get((rootNote + ' ' + scaleType).toLowerCase()).notes
      scale = scale.map(note => TonalNote.simplify(note))
      console.log(scale)
      let opacity = 0.3
      if (
        scale.indexOf(note) > -1 ||
        scale.indexOf(TonalNote.enharmonic(note)) > -1
      ) {
        opacity = 1
      }
      for (let i = 0; i < 32; i++) {
        if (state) {
          previouslyActivatedNotes = new Array(10)
          state.track.layers.forEach((layer, index) => {
            layer.sequence.forEach(note => {
              if (note.id === buttonId) {
                previouslyActivatedNotes[index] = true
              }
            })
          })
        }
        row.push(
          <Note
            opacity={opacity}
            toggleNoteActivate={toggleNoteActivate}
            buttonId={buttonId}
            previouslyActivatedNotes={previouslyActivatedNotes}
          ></Note>,
        )
        buttonId += 1
      }
      buttons.push(
        <div style={{ display: 'flex', flexDirection: 'row' }} id={'row' + j}>
          <div
            style={{
              height: '20px',
              width: '10px',
              flex: 1,
              border: 'none',
            }}
          >
            <Typography
              color={
                scale.indexOf(note) > -1 ||
                scale.indexOf(TonalNote.enharmonic(note)) > -1
                  ? 'white'
                  : '#383838'
              }
              variant="text"
            >
              {notes[j]}
            </Typography>
          </div>
          {row}
        </div>,
      )
    }
    return buttons
  }

  const changeTrack = () => {
    const sequence = buttonArray.filter(button => {
      return button.activated
    })

    const layer = {
      name: layerName,
      sequence: sequence,
      instrument: instrument,
      volume: volume,
      user: username,
    }

    const layers = [...currentTrack.layers]

    if (layers.length > numberOfLayers) {
      layers.pop()
    }
    layers.push(layer)

    const newTrack = {
      title: title,
      bpm: bpm,
      layers: layers,
      imgUrl: imgUrl,
    }
    setCurrentTrack(newTrack)
  }

  const playPauseIcons = () => {
    if (paused) {
      return <PlayArrowIcon color="primary" sx={{ height: 38, width: 38 }} />
    } else {
      return <PauseIcon color="primary" sx={{ height: 38, width: 38 }} />
    }
  }

  const uploadLayer = event => {
    event.preventDefault()
    const sequence = buttonArray.filter(button => {
      return button.activated
    })

    const layer = {
      name: layerName,
      sequence: sequence,
      instrument: instrument,
      volume: volume,
      user: username,
    }

    const layers = [...currentTrack.layers]

    if (layers.length > numberOfLayers) {
      layers.pop()
    }
    layers.push(layer)

    const newTrack = {
      title: title,
      bpm: bpm,
      layers: layers,
      imgUrl: imgUrl,
    }
    axios({
      method: 'post',
      url: 'http://localhost:9000/tracks/',
      data: newTrack,
    })
      .then(res => {
        Tone.Transport.stop()
        navigate('/timeline')
      })
      // .then(res => {
      //   if (res.data.createdTrack) {
      //     setAlert({
      //       severity: 'success',
      //       message: 'Track created successfully! You can now log in.',
      //     })
      //   }
      // })
      .catch(error => {
        // setAlert({
        //   severity: 'error',
        //   message: error.response.data.message,
        // })
        console.log(error)
      })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            padding: '10px',
            mb: '25px',
          }}
          flex
          flexDirection="column"
        >
          <Card
            sx={{
              maxWidth: '550px',
              boxShadow: '5px 10px 15px 10px #170a1c',
              padding: '6px',
              backgroundColor: '#461e52',
            }}
          >
            <Box sx={{ display: 'flex', backgroundColor: '#461e52' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 150,
                    height: 150,
                    padding: '6px',
                    boxShadow: '0px 0px 15px 10px #170a1c',
                  }}
                  image={imgUrl ? imgUrl : DEFAULT_PICTURE_URL}
                />

                <Button
                  color="tertiary"
                  variant="contained"
                  endIcon={<DoneOutlineIcon sx={{ color: 'black' }} />}
                  onClick={uploadLayer}
                  sx={{ width: '75%' }}
                ></Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 0px 15px 10px #170a1c',
                  width: '500px',
                }}
              >
                <CardContent
                  sx={{ width: '300px', bgcolor: 'background.paper' }}
                >
                  <TextField
                    required
                    sx={{ width: '350px' }}
                    id="title"
                    label="Title"
                    variant="standard"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <TextField
                    required
                    sx={{ width: '350px' }}
                    id="imgurl"
                    label="Image URL"
                    variant="standard"
                    type="text"
                    autoComplete="off"
                    value={imgUrl}
                    required="false"
                    onChange={e => setImgUrl(e.target.value)}
                  />
                  <TextField
                    required
                    sx={{ width: '350px' }}
                    id="layerName"
                    label="Layer Name"
                    variant="standard"
                    type="text"
                    autoComplete="off"
                    value={layerName}
                    onChange={e => setLayerName(e.target.value)}
                  />
                </CardContent>
              </Box>
            </Box>
          </Card>
          {currentTrack?.layers.length > 1 ? (
            <Box
              sx={{
                maxWidth: '550px',
                boxShadow: '0px 10px 15px 10px #170a1c',
                padding: '6px',
                backgroundColor: '#461e52',
              }}
            >
              {currentTrack?.layers.map(layer => (
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
                          onClick={() => {}}
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
            </Box>
          ) : null}
        </Box>
      </Modal>
      <Box
        sx={{
          padding: '10px',
          mb: '25px',
          boxShadow: '0px 0px 15px 10px #170a1c',
        }}
        flex
        flexDirection="column"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mb: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Tooltip title="Instrument">
              <MusicNoteIcon
                sx={{ fontSize: '40px', mr: '15px', color: '#00968f' }}
              />
            </Tooltip>
            <Select
              labelId="instrument"
              id="instrument"
              size="small"
              value={instrument}
              label="Instrument"
              variant="standard"
              onChange={e => setInstrument(e.target.value)}
            >
              {instruments.map(instrument => {
                return (
                  <MenuItem value={instrument.name}>{instrument.name}</MenuItem>
                )
              })}
            </Select>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Tooltip title="Scale">
              <PianoIcon
                sx={{ fontSize: '40px', mr: '15px', color: '#bd0d00' }}
              />
            </Tooltip>

            <Select
              labelId="rootNote"
              id="rootNote"
              value={rootNote}
              label="Root Note"
              variant="standard"
              onChange={e => setRootNote(e.target.value)}
              sx={{ mr: '5px' }}
            >
              {Scale.get('c chromatic').notes.map(note => (
                <MenuItem value={note}>{note}</MenuItem>
              ))}
            </Select>
            <Select
              labelId="scaleType"
              id="scaleType"
              value={scaleType}
              label="Scale Type"
              variant="standard"
              onChange={e => setScaleType(e.target.value)}
            >
              <MenuItem value={'Chromatic'}>Chromatic</MenuItem>
              <MenuItem value={'Major'}>Major</MenuItem>
              <MenuItem value={'Minor'}>Minor</MenuItem>
              <MenuItem value={'Major Pentatonic'}>Major Pentatonic</MenuItem>
              <MenuItem value={'Minor Pentatonic'}>Minor Pentatonic</MenuItem>
              <MenuItem value={'Lydian'}>Lydian</MenuItem>
              <MenuItem value={'Dorian'}>Dorian</MenuItem>
              <MenuItem value={'Mixolydian'}>Mixolydian</MenuItem>
              <MenuItem value={'Major Blues'}>Major Blues</MenuItem>
              <MenuItem value={'Minor Blues'}>Minor Blues</MenuItem>
            </Select>
          </div>
          <IconButton
            onClick={() =>
              paused
                ? Tone.Transport.start() && setPaused(!paused)
                : Tone.Transport.pause() && setPaused(!paused)
            }
            aria-label="play/pause"
          >
            {playPauseIcons()}
          </IconButton>
          <Tooltip title="View details & confirm">
            <IconButton onClick={handleOpen}>
              <DoneOutlineIcon color="tertiary" />
            </IconButton>
          </Tooltip>
          <TextField
            required
            sx={{ width: '5%' }}
            id="BPM"
            label="BPM"
            variant="standard"
            type="number"
            autoComplete="off"
            value={bpm}
            onChange={e => setBpm(e.target.value)}
          />

          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, mr: '7px' }}
            alignItems="center"
          >
            <VolumeDown />
            <Slider
              sx={{ color: '#36009c', width: '150px' }}
              aria-label="Volume"
              value={volume}
              onChange={e => setVolume(e.target.value)}
              min={-20}
              max={0}
            />
            <VolumeUp />
          </Stack>
        </Box>

        <Box sx={{ pl: '10px', pr: '10px' }}>
          <div
            style={{
              height: '20px',
              width: '10px',
              flex: 1,
              border: 'none',
            }}
          ></div>{' '}
          <div>
            <Player track={currentTrack} changeTrack={changeTrack}></Player>
          </div>
        </Box>
        <Box sx={{ pl: '10px', pr: '10px' }}>{displayButtons()}</Box>
      </Box>
    </div>
  )
}

export default Sequencer
