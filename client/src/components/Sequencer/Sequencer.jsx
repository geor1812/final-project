import React, { useRef, useState, useEffect } from 'react'
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
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import instruments from '../player/instruments.js'
import Player from '../player/Player'

const Sequencer = () => {
  const [buttonArray, setButtonArray] = useState([])
  const [title, setTitle] = useState('')
  const [layerName, setLayerName] = useState('')
  const [instrument, setInstrument] = useState('beep')
  const [volume, setVolume] = useState(-10)
  const [currentTrack, setCurrentTrack] = useState()
  const [numberOfLayers, setNumberOfLayers] = useState()

  const mockData = {
    title: 'Meadow',
    bpm: '80',
    layers: [
      {
        name: 'Bouncy Bass',
        user: 'gary123',
        instrument: 'Bass',
        sequence: [
          { step: 0, note: 'B5', activated: true, id: 0 },
          { step: 16, note: 'B5', activated: true, id: 16 },
          { step: 26, note: 'B5', activated: true, id: 26 },
          { step: 2, note: 'A5', activated: true, id: 4 },
          { step: 10, note: 'A5', activated: true, id: 12 },
          { step: 18, note: 'A5', activated: true, id: 20 },
          { step: 22, note: 'A5', activated: true, id: 24 },
          { step: 30, note: 'A5', activated: true, id: 32 },
          { step: 6, note: 'F#5', activated: true, id: 11 },
          { step: 14, note: 'F#5', activated: true, id: 19 },
          { step: 20, note: 'F#5', activated: true, id: 25 },
          { step: 28, note: 'F#5', activated: true, id: 33 },
        ],
        volume: -10,
      },
    ],
  }

  useEffect(() => {
    const initialButtonArray = []
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
    setCurrentTrack(mockData)
    setNumberOfLayers(mockData.layers.length)
  }, [])

  const buttons = []
  const steps = []
  let buttonId = 0
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

  // const uploadLayer = event => {
  //   event.preventDefault()
  //   const sequence = buttonArray.filter(button => {
  //     return button.activated
  //   })
  //   const layer = {
  //     name: layerName,
  //     user: 1,
  //     sequence: sequence,
  //     instrument: instrument,
  //     volume: volume,
  //   }

  //   const song = {
  //     title: title,
  //     bpm: 80,
  //     layers: [],
  //   }
  // }

  const changeInstrument = e => {
    setInstrument(e.target.value)
  }

  const changeVolume = e => {
    setVolume(e.target.value)
  }
  const changeTrack = e => {
    const sequence = buttonArray.filter(button => {
      return button.activated
    })
    const layer = {
      name: layerName,
      user: 1,
      sequence: sequence,
      instrument: instrument,
      volume: volume,
    }

    const currentTrackCopy = { ...currentTrack }

    if (currentTrack.layers.length > numberOfLayers) {
      currentTrack.layers.pop()
    }
    currentTrackCopy.layers.push(layer)
    setCurrentTrack(currentTrackCopy)
  }

  return (
    <div>
      <Player track={currentTrack} changeTrack={changeTrack}></Player>
      {buttons}
      {/* <form onSubmit={uploadLayer}> */}
      <form>
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
