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
import { Scale, Note as TonalNote } from '@tonaljs/tonal'

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
  const [volume, setVolume] = useState(-25)

  let step = useRef(0)
  // let [step, setStep] = useState(30)

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
          id: i + j * 32,
        })
      }
    }
    setButtonArray(initialButtonArray)

    if (state) {
      setCurrentTrack(state.track)
      setNumberOfLayers(state.track.layers.length)
      setTitle(state.track.title)
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
    Tone.start()
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

    // commented out step indicator because it is a big performance hit

    // buttons.push(
    //   <div style={{ display: 'flex', flexDirection: 'row' }}>
    //     <div
    //       style={{
    //         height: '20px',
    //         width: '10px',
    //         flex: 1,
    //         border: 'none',
    //         opacity: 0,
    //       }}
    //     ></div>
    //     {displayIndicators()}
    //   </div>,
    // )

    for (let j = 0; j < 24; j++) {
      const row = []
      let note = notes[j].slice(0, -1)
      note = TonalNote.simplify(note)
      let scale = Scale.get((rootNote + ' ' + scaleType).toLowerCase()).notes
      scale = scale.map(note => TonalNote.simplify(note))
      console.log(scale)
      let opacity = 0.7
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
            <h1 style={{ fontSize: 10 }}>{notes[j]}</h1>
          </div>
          {row}
        </div>,
      )
    }
    return buttons
  }

  const displayIndicators = () => {
    const indicators = []
    let beatMargin = 0

    for (let i = 0; i < step.current; i++) {
      if ((i + 1) % 4 === 1) {
        beatMargin = 5
      } else {
        beatMargin = 0
      }
      indicators.push(
        <div
          style={{
            margin: 2,
            marginLeft: beatMargin,
            marginBottom: 3,
            height: '20px',
            width: '10px',
            flex: 1,
            border: 'none',
            opacity: 0,
          }}
          id={i}
          key={i}
        ></div>,
      )
    }

    if ((step.current + 1) % 4 === 1) {
      beatMargin = 5
    } else {
      beatMargin = 0
    }

    indicators.push(
      <div
        style={{
          backgroundColor: 'orange',
          margin: 2,
          marginLeft: beatMargin,
          marginBottom: 3,
          height: '20px',
          width: '10px',
          flex: 1,
          border: 'none',
        }}
        id={step.current}
        key={step.current}
      ></div>,
    )

    for (let i = step.current + 1; i < 32; i++) {
      if ((i + 1) % 4 === 1) {
        beatMargin = 5
      } else {
        beatMargin = 0
      }

      indicators.push(
        <div
          style={{
            margin: 2,
            marginLeft: beatMargin,
            marginBottom: 3,
            height: '20px',
            width: '10px',
            flex: 1,
            border: 'none',
            opacity: 0,
          }}
          id={i}
          key={i}
        ></div>,
      )
    }
    return indicators
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

  const playPauseIcons = () => {
    if (paused) {
      return <PlayArrowIcon color="primary" sx={{ height: 38, width: 38 }} />
    } else {
      return <PauseIcon color="primary" sx={{ height: 38, width: 38 }} />
    }
  }

  const getStep = () => {
    // setStep((step += 1))
    // if (step > 32) {
    //   setStep(0)
    // }
    step.current += 1
    if (step.current > 32) {
      step.current = 0
    }
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
        getStep={getStep}
      ></Player>
      {displayButtons()}
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
          onClick={() =>
            paused
              ? Tone.Transport.start() && setPaused(!paused)
              : Tone.Transport.pause() && setPaused(!paused)
          }
          aria-label="play/pause"
        >
          {playPauseIcons()}
        </IconButton>
        <InputLabel id="instrument">Instrument</InputLabel>
        <Select
          labelId="instrument"
          id="instrument"
          value={instrument}
          label="instrument"
          onChange={e => setInstrument(e.target.value)}
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
            onChange={e => setVolume(e.target.value)}
            min={-40}
            max={-20}
          />
          <VolumeUp />
        </Stack>
        <Select
          labelId="rootNote"
          id="rootNote"
          value={rootNote}
          label="rootNote"
          onChange={e => setRootNote(e.target.value)}
        >
          {Scale.get('c chromatic').notes.map(note => (
            <MenuItem value={note}>{note}</MenuItem>
          ))}
        </Select>
        <Select
          labelId="scaleType"
          id="scaleType"
          value={scaleType}
          label="scaleType"
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
