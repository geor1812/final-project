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
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import instruments from './instruments.js'

const Sequencer = () => {
  const [buttonArray, setButtonArray] = useState([])
  const [cycle, setCycle] = useState(0)
  const [title, setTitle] = useState('')
  const [layerName, setLayerName] = useState('')
  const [instrument, setInstrument] = useState(instruments[0])
  let step = useRef(0)
  let synth = useRef()
  const numberOfNotes = 32 * 25

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
    synth.current = new Tone.AMSynth().toDestination()
    synth.current.set(instrument.settings)
    synth.current.volume.value = -10
  }, [])

  useEffect(() => {
    Tone.Transport.cancel()
    Tone.Transport.start()
    // Tone.start()
    Tone.Transport.scheduleRepeat(repeat, '16n')
    Tone.Transport.bpm.value = 80

    console.log(instrument.type)
  }, [cycle])

  async function repeat() {
    for (const button of buttonArray) {
      if (button.step === step.current && button.activated) {
        const now = Tone.now()
        synth.current.triggerAttackRelease(button.note, '2n', now + 10)
      }
    }
    step.current = step.current + 1
    if (step.current > 32) {
      step.current = 0
      setCycle(cycle + 1)
    }
  }

  const toggleNoteActivate = e => {
    Tone.start()
    const newButtonArray = buttonArray.map(note => note)
    const id = e.target.id
    if (newButtonArray[id]) {
      newButtonArray[id].activated = !newButtonArray[id].activated
      setButtonArray(newButtonArray)
    }
  }

  const buttons = []
  let buttonId = 0

  for (let j = 0; j < 25; j++) {
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
        {row}
      </div>,
    )
  }

  const uploadLayer = event => {
    event.preventDefault()
    const sequence = buttonArray.filter(button => {
      return button.activated
    })
    const layer = {
      name: layerName,
      user: 1,
      sequence: sequence,
      instrument: instrument.name,
      volume: 0,
    }

    const song = {
      title: title,
      bpm: 80,
      layers: [],
    }

    console.log(layer)
  }

  const changeInstrument = e => {
    setInstrument(
      instruments.filter(instrument => {
        return instrument.name === e.target.value
      })[0],
    )
    switch (instrument.type) {
      case 'AM':
        synth.current = new Tone.AMSynth().toDestination()
        break
      case 'FM':
        synth.current = new Tone.FMSynth().toDestination()
        break
      case 'Mono':
        synth.current = new Tone.MonoSynth().toDestination()
        break
    }
    synth.current.set(instrument.settings)
    synth.current.volume.value = -10
  }

  return (
    <div>
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
        <InputLabel id="instrument">Instrument</InputLabel>
        <Select
          labelId="instrument"
          id="instrument"
          value={instrument.name}
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
