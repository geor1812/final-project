import React, { useRef, useState, useEffect } from 'react'
import * as Tone from 'tone'
import instruments from './instruments.js'
import { Box } from '@mui/material'

const Player = ({ track, changeTrack }) => {
  let step = useRef(0)
  let synths = useRef([])

  useEffect(() => {
    // create a synth for each layer of track
    synths.current.splice(0, synths.current.length)
    if (track) {
      track.layers.map(layer => {
        let instrument = instruments.filter(instrument => {
          return instrument.name === layer.instrument.toLowerCase()
        })[0]

        switch (instrument.type) {
          case 'AM':
            synths.current.push(new Tone.AMSynth().toDestination())
            break
          case 'FM':
            synths.current.push(new Tone.FMSynth().toDestination())
            break
        }

        synths.current.at(-1).set(instrument.settings)
        synths.current.at(-1).volume.value = layer.volume
      })

      Tone.Transport.cancel()
      Tone.Transport.start()
      Tone.Transport.scheduleRepeat(repeat, '16n')
      Tone.Transport.bpm.value = track.bpm
    }
  }, [track])

  async function repeat() {
    let synthNumber = 0
    for (const layer of track.layers) {
      for (const trigger of layer.sequence) {
        if (trigger.step === step.current) {
          synths.current[synthNumber].triggerAttackRelease(trigger.note, '2n')
        }
      }

      synthNumber += 1
    }
    if (step.current === 32) {
      step.current = 0
      if (changeTrack) {
        changeTrack()
      }
    }
    step.current = step.current + 1
  }

  return null
}

export default Player
