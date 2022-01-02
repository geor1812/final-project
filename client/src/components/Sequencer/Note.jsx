import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import styled from 'styled-components'
const Note = ({
  buttonId,
  toggleNoteActivate,
  previouslyActivatedNotes,
  opacity,
}) => {
  const [activated, setActivated] = useState(false)
  const [color, setColor] = useState('#e58e35')

  const toggleNoteActivateAndChangeColor = e => {
    if (!activated) {
      setColor('#7a98ee')
    } else {
      setColor('#e58e35')
    }
    setActivated(!activated)
    toggleNoteActivate(e)
  }

  const showPreviouslyActivatedNotes = e => {
    const noteIndicators = []

    if (previouslyActivatedNotes[0]) {
      noteIndicators.push(
        <div
          style={{
            backgroundColor: 'greenyellow',
            height: '5px',
            width: '5px',
            border: 'none',
          }}
        ></div>,
      )
    }
    if (previouslyActivatedNotes[1]) {
      noteIndicators.push(
        <div
          style={{
            backgroundColor: 'purple',
            height: '5px',
            width: '5px',
            border: 'none',
          }}
        ></div>,
      )
    }
    if (previouslyActivatedNotes[2]) {
      noteIndicators.push(
        <div
          style={{
            backgroundColor: 'lightblue',
            height: '5px',
            width: '5px',
            border: 'none',
          }}
        ></div>,
      )
    }
    return noteIndicators
  }

  let beatMargin = '0 px'
  if ((buttonId + 1) % 4 === 1) {
    beatMargin = '25px'
  }

  return (
    <Box
      sx={{
        backgroundColor: color,
        boxShadow: activated ? '0px 0px 10px #7a98ee' : 'none',
        margin: '3px',
        marginLeft: beatMargin,
        mb: '3px',
        height: '20px',
        flex: 1,
        border: 'none',
        opacity: activated ? 1 : opacity,
        padding: '0px',
        '&:hover': {
          boxShadow: '0px 0px 10px #dd517e',
          backgroundColor: '#dd517e',
        },
      }}
      id={buttonId}
      key={buttonId}
      onClick={e => toggleNoteActivateAndChangeColor(e)}
    >
      {showPreviouslyActivatedNotes()}
    </Box>
  )
}

export default Note
