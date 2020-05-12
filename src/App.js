import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMeetings } from './data/dailyCoActions'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import AverageSessionDuration from './graph/AverageSessionDuration'
import Box from '@material-ui/core/Box'
import StartTimeByWeekday from './graph/StartTimeByWeekday'
import NumberOfParticipants from './graph/NumberOfParticipants'
import Timeline from './graph/Timeline'
import Header from './components/Header'
import ParticipantAndDurationTimeline from './graph/ParticipantAndDurationTimeline'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMeetings())
    }, [dispatch])

    return (
        <Box marginTop={2}>
            <CssBaseline />
            <main>
                <Container maxWidth="lg" style={{ overflow: 'hidden' }}>
                    <Grid container spacing={3}>
                        <Header />
                        <Timeline />
                        <ParticipantAndDurationTimeline />
                        <AverageSessionDuration />
                        <StartTimeByWeekday />
                        <NumberOfParticipants />
                    </Grid>
                </Container>
            </main>
        </Box>
    )
}

export default App
