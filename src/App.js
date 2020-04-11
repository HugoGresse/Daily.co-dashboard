import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getMeetings} from './data/dailyCoActions'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import AverageSessionDuration from './graph/AverageSessionDuration'
import Box from '@material-ui/core/Box'
import StartTimeByDay from './graph/StartTimeByDay'


// Call by day
// call that should be ended
// number of call ended, started, ongoing
// Average number of participant by meeting

// live:
// ongoing call
function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMeetings(true))
    }, [dispatch])

    return (
        <Box marginTop={6}>
            <CssBaseline />
            <main>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <AverageSessionDuration/>
                        <StartTimeByDay/>
                    </Grid>
                </Container>
            </main>
        </Box>
    )
}

export default App
