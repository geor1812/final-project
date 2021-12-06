import React, { useRef, useState, useEffect } from 'react'
import * as Tone from 'tone'
import Note from './Note'

const Sequencer = () => {
  const [buttonArray, setButtonArray] = useState([])
  let step = useRef(0)
  const [cycle, setCycle] = useState(0)
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
  }, [])

  useEffect(() => {
    Tone.Transport.cancel()
    Tone.Transport.start()
    Tone.start()
    Tone.Transport.scheduleRepeat(repeat, '4n')
    Tone.Transport.bpm.value = 160
  }, [cycle])

  async function repeat() {
    console.log(step)
    for (const button of buttonArray) {
      if (button.step === step.current && button.activated) {
        console.log(button)
        const synth = new Tone.AMSynth().toDestination()
        synth.triggerAttackRelease(button.note, '2n')
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

  // let instrument = new Tone.Synth().toMaster()
  // let synthJSON = {
  //   oscillator: {
  //     type: 'fatcustom',
  //     partials: [0.2, 1, 0, 0.5, 0.1],
  //     spread: 40,
  //     count: 3,
  //   },
  //   envelope: {
  //     attack: 0.001,
  //     decay: 1.6,
  //     sustain: 0,
  //     release: 1.6,
  //   },
  // }

  // instrument.set(synthJSON)
  // instrument.volume.value = -20

  return buttons
}

export default Sequencer
