import React, { useState, useEffect } from 'react'

const Note = ({
  buttonId,
  toggleNoteActivate,
  previouslyActivatedNotes,
  opacity,
}) => {
  const [activated, setActivated] = useState(false)
  const [color, setColor] = useState('orange')

  const toggleNoteActivateAndChangeColor = e => {
    if (!activated) {
      setColor('blue')
    } else {
      setColor('orange')
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
    return noteIndicators
  }

  let beatMargin = 0
  if ((buttonId + 1) % 4 === 1) {
    beatMargin = 5
  }

  return (
    <div
      style={{
        backgroundColor: color,
        margin: 2,
        marginLeft: beatMargin,
        marginBottom: 3,
        height: '20px',
        width: '10px',
        flex: 1,
        border: 'none',
        opacity: opacity,
      }}
      id={buttonId}
      key={buttonId}
      onClick={e => toggleNoteActivateAndChangeColor(e)}
    >
      {showPreviouslyActivatedNotes()}
    </div>
  )
}

export default Note
