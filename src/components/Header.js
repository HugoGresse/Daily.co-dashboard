import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'
import { isLoadingSelector } from '../data/dailyCoSelectors'
import Link from '@material-ui/core/Link'
import GitHubLogo from '../assets/github.svg'
import DateTimePicker from './DateTimePicker'
import { getMeetings, setDates } from '../data/dailyCoActions'

const Header = () => {
    const isLoading = useSelector(isLoadingSelector)
    const dispatch = useDispatch()
    return (
        <Grid item xs={12}>
            <Grid container alignItems="center">
                <Grid
                    item
                    md={6}
                    xs={12}
                    component={Box}
                    display="flex"
                    justifyContent="space-between">
                    <Typography variant="h2">Daily.co dashboard</Typography>
                </Grid>

                <Grid
                    item
                    md={6}
                    xs={12}
                    component={Box}
                    display="flex"
                    justifyContent="space-between">
                    <DateTimePicker
                        onClose={(startDate, endDate) => {
                            dispatch(setDates(startDate.unix(), endDate.unix()))
                            dispatch(getMeetings())
                        }}
                    />

                    {isLoading && (
                        <Box>
                            <CircularProgress />
                        </Box>
                    )}

                    <Link
                        href="https://github.com/HugoGresse/Daily.co-dashboard"
                        target="_blank">
                        <img
                            height="38"
                            width="38"
                            src={GitHubLogo}
                            alt="Github"
                        />
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header
