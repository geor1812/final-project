import React, { useState } from 'react'

const Note = props => {
  const [activated, setActivated] = useState(false)
  const [color, setColor] = useState('orange')

  const toggleNoteActivateAndChangeColor = e => {
    if (!activated) {
      setColor('blue')
    } else {
      setColor('orange')
    }
    setActivated(!activated)
    props.toggleNoteActivate(e)
  }

  let beatMargin = 0
  if ((props.buttonId + 1) % 4 === 1) {
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
      }}
      id={props.buttonId}
      key={props.buttonId}
      onClick={e => toggleNoteActivateAndChangeColor(e)}
    ></div>
  )
}

export default Note
