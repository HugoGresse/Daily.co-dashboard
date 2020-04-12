import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getMeetings} from './data/dailyCoActions'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import AverageSessionDuration from './graph/AverageSessionDuration'
import Box from '@material-ui/core/Box'
import StartTimeByDay from './graph/StartTimeByDay'
import NumberOfParticipants from './graph/NumberOfParticipants'
import {isLoadingSelector} from './data/dailyCoSelectors'
import CircularProgress from '@material-ui/core/CircularProgress'
import Timeline from './graph/Timeline'


// call that should be ended
// number of call ended, started, ongoing
// duration when to participants in a call

// live:
// ongoing call
function App() {
    const dispatch = useDispatch()
    const isLoading = useSelector(isLoadingSelector)

    useEffect(() => {
        dispatch(getMeetings(true))
    }, [dispatch])

    if(isLoading) {
        return <Box
            height='100vh'
            width="100vw"
            textAlign="center"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <CircularProgress/></Box>
    }

    return (
        <Box marginTop={6}>
            <CssBaseline/>
            <main>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Timeline/>
                        <AverageSessionDuration/>
                        <StartTimeByDay/>
                        <NumberOfParticipants/>
                    </Grid>
                </Container>
            </main>
        </Box>
    )
}

export default App
