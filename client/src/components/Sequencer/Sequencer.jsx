import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as Tone from 'tone'
import Note from './Note'
import {
  Slider,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  Stack,
  IconButton,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import instruments from '../player/instruments.js'
import Player from '../player/Player'
import axios from 'axios'

const Sequencer = props => {
  const { token, location } = props
  let navigate = useNavigate()

  const { state } = useLocation()
  const track = false
  if (state) {
    const { track } = state
  }

  const [play, setPlay] = useState(0)

  const [buttonArray, setButtonArray] = useState([])
  const [currentTrack, setCurrentTrack] = useState()
  const [numberOfLayers, setNumberOfLayers] = useState()

  const [title, setTitle] = useState('')
  const [bpm, setBpm] = useState(80)

  const [username, setUsername] = useState('')
  const [layerName, setLayerName] = useState('')
  const [instrument, setInstrument] = useState('beep')
  const [volume, setVolume] = useState(-10)

  const notes = [
    'B5',
    'A#5',
    'A5',
    'G#5',
    'G5',
    'F#5',
    'F5',
    'E5',
    'D#5',
    'D5',
    'C#5',
    'C5',
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
  ]

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  })

  useEffect(() => {
    const initialButtonArray = []
    for (let j = 0; j < 25; j++) {
      for (let i = 0; i < 32; i++) {
        initialButtonArray.push({
          step: i,
          note: notes[j],
          activated: false,
          id: i + j,
        })
      }
    }
    setButtonArray(initialButtonArray)

    if (track) {
      setCurrentTrack(track)
      setNumberOfLayers(track.layers.length)
      setTitle(track.title)
    } else {
      setNumberOfLayers(0)
      setCurrentTrack({
        title: '',
        bpm: bpm,
        layers: [],
      })
      // setPlay(play + 1)
    }

    axios({
      method: 'get',
      url: `http://localhost:9000/accounts/${token}`,
    }).then(res => {
      console.log(res.data.account.username)
      setUsername(res.data.account.username)
    })
  }, [])

  const buttons = []
  const steps = []
  let buttonId = 0

  const toggleNoteActivate = e => {
    Tone.start()
    const newButtonArray = buttonArray.map(note => note)
    const id = e.target.id
    if (newButtonArray[id]) {
      newButtonArray[id].activated = !newButtonArray[id].activated
      setButtonArray(newButtonArray)
    }
  }

  for (let j = 0; j < 24; j++) {
    const row = []
    for (let i = 0; i < 32; i++) {
      row.push(
        <Note
          toggleNoteActivate={toggleNoteActivate}
          buttonId={buttonId}
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
          <h1 style={{ fontSize: 10 }}>{notes[j]}</h1>
        </div>
        {row}
      </div>,
    )
  }

  const changeInstrument = e => {
    setInstrument(e.target.value)
  }

  const changeVolume = e => {
    setVolume(e.target.value)
  }

  const changeBpm = e => {
    setBpm(e.target.value)
  }

  const changeTrack = e => {
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
    }
    setCurrentTrack(newTrack)
  }

  const uploadLayer = event => {
    event.preventDefault()
    console.log(currentTrack)
    axios({
      method: 'post',
      url: 'http://localhost:9000/tracks/',
      data: currentTrack,
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
      <Player
        track={currentTrack}
        changeTrack={changeTrack}
        play={play}
      ></Player>
      {buttons}
      <form onSubmit={uploadLayer}>
        {' '}
        <TextField
          required
          sx={{ width: '75%' }}
          id="title"
          label="Title"
          variant="outlined"
          type="text"
          autoComplete="off"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          required
          sx={{ width: '75%' }}
          id="layerName"
          label="Layer Name"
          variant="outlined"
          type="text"
          autoComplete="off"
          value={layerName}
          onChange={e => setLayerName(e.target.value)}
        />
        <TextField
          required
          sx={{ width: '5%' }}
          id="BPM"
          label="BPM"
          variant="outlined"
          type="number"
          autoComplete="off"
          value={bpm}
          onChange={e => setBpm(e.target.value)}
        />
        <IconButton
          onClick={() => Tone.Transport.start()}
          aria-label="play/pause"
        >
          <PlayArrowIcon color="primary" sx={{ height: 38, width: 38 }} />
        </IconButton>
        <InputLabel id="instrument">Instrument</InputLabel>
        <Select
          labelId="instrument"
          id="instrument"
          value={instrument}
          label="instrument"
          onChange={e => {
            changeInstrument(e)
          }}
        >
          {instruments.map(instrument => {
            return (
              <MenuItem value={instrument.name}>{instrument.name}</MenuItem>
            )
          })}
        </Select>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider
            aria-label="Volume"
            value={volume}
            onChange={changeVolume}
            min={-20}
            max={-5}
          />
          <VolumeUp />
        </Stack>
        <Button
          sx={{ width: '50%' }}
          variant="contained"
          endIcon={<LoginIcon />}
          type="submit"
        >
          Upload
        </Button>
      </form>
    </div>
  )
}

export default Sequencer
