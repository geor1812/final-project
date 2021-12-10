import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import NotesIcon from '@mui/icons-material/Notes'

const TrackCard = ({ track }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = () => {
    if (expanded === true) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  return (
    <Card
      sx={{
        maxWidth: '462px',
        boxShadow: '5px 10px 15px 10px #170a1c',
        padding: '6px',
        backgroundColor: '#461e52',
      }}
    >
      <Box sx={{ display: 'flex', backgroundColor: '#461e52' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent sx={{ width: '300px', bgcolor: 'background.paper' }}>
            <Typography component="div" variant="h5">
              {track.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`${track.bpm} BPM`}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: 1,
              bgcolor: 'background.paper',
            }}
          >
            <IconButton onClick={handleExpand} aria-label="expand">
              <NotesIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon color="primary" sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="contribute">
              <AddIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 150, height: 150, padding: '6px' }}
          image="https://eskipaper.com/images/fruit-background-2.jpg"
        />
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ padding: 0, bgcolor: 'background.paper' }}>
          <Divider sx={{ borderBottomWidth: '3px' }} />
          {track.layers.map(layer => (
            <List
              sx={{
                maxWidth: '300px',
                //bgcolor: 'background.paper',
              }}
            >
              <ListItem>
                <ListItemText
                  primary={layer.name}
                  secondary={layer.user}
                  sx={{ width: '300px' }}
                />
                <ListItemText secondary={layer.instrument} />
              </ListItem>
            </List>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default TrackCard
