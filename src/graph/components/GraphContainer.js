import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {Box} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const GraphContainer = ({title, xs=12, sm=4, header, children}) => {
    return  <Grid item xs={xs} sm={sm}>
        <Card>
            <CardContent>

                    {header && header}
                    {!header && <Typography variant="h5">{title}</Typography>}
                <Box  height={400}>
                    {children}
                </Box>
            </CardContent>
        </Card>
    </Grid>
}

export default GraphContainer
