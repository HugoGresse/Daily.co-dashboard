import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import {useSelector} from 'react-redux'
import {isLoadingSelector} from './data/dailyCoSelectors'
import Link from '@material-ui/core/Link'
import GitHubLogo from "./assets/github.svg"

const Header = () => {

    const isLoading = useSelector(isLoadingSelector)

    return  <Grid item xs={12} component={Box} display="flex" justifyContent="space-between">
        <Typography variant="h2">
            Daily.co dashboard
        </Typography>
        <Box display="flex"  alignItems="center">
            {isLoading && <Box margin={1}><CircularProgress color="#FF0000"/></Box>}
            <Link href="https://github.com/HugoGresse/Daily.co-dashboard" target="_blank"><img height="38" width="38" src={GitHubLogo} alt="Github"/></Link>
        </Box>
    </Grid>

}

export default Header
