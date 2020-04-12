import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMeetings } from './data/dailyCoActions'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import AverageSessionDuration from './graph/AverageSessionDuration'
import Box from '@material-ui/core/Box'
import StartTimeByDay from './graph/StartTimeByDay'
import NumberOfParticipants from './graph/NumberOfParticipants'
import Timeline from './graph/Timeline'
import Header from './Header'

// call that should be ended
// number of call ended, started, ongoing
// duration when two participants in a call

// live:
// ongoing call
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMeetings(true))
  }, [dispatch])

  return (
    <Box marginTop={2}>
      <CssBaseline />
      <main>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Header />
            <Timeline />
            <AverageSessionDuration />
            <StartTimeByDay />
            <NumberOfParticipants />
          </Grid>
        </Container>
      </main>
    </Box>
  )
}

export default App
