const express = require('express')
const router = express.Router()
const Track = require('../models/Track')

//Get all
router.get('/', async (req, res) => {
  try {
    let tracks
    tracks = await Track.find()
    res.send({ tracks: tracks })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

//Get by id
router.get('/:id', getTrack, (req, res) => {
  res.send({ track: res.track })
})

//Create one
router.post('', async (req, res) => {
  const track = new Track({
    title: req.body.title,
    bpm: req.body.bpm,
    layers: req.body.layers,
  })
  console.log(track)

  try {
    const createdTrack = await track.save()
    res.status(201).send({ data: createdTrack })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

//Delete by id
router.delete('/:id', getTrack, async (req, res) => {
  try {
    await res.track.remove()
    res.send({ message: 'Deleted track' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

//Middleware function
async function getTrack(req, res, next) {
  let track
  try {
    track = await Track.findById(req.params.id)
    if (track == null) {
      return res.status(404).send({ message: 'Can not find track' })
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }

  res.track = track
  next()
}

module.exports = router
