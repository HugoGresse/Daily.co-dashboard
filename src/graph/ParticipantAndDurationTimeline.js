import React, { useState } from 'react'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import TimelineGraph from './TimelineGraph'
import GraphContainer from './components/GraphContainer'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import {
    getAloneParticipantFor2Minutes,
    getAloneParticipantFor4Minutes,
} from '../data/selectors/getAloneParticipantForXMinutesSelector'

const ParticipantAndDurationTimeline = () => {
    const [selectedData, setSelectedData] = useState(null)
    const onGraphSelected = (e) => {
        switch (e.currentTarget.value) {
            default:
            case 'oneperson_twominutes':
                setSelectedData({
                    value: e.currentTarget.value,
                    plots: [
                        {
                            selector: getAloneParticipantFor2Minutes,
                            name: ' alone people for 2 minutes',
                        },
                        {
                            selector: getAloneParticipantFor4Minutes,
                            name: ' alone people for 4 minutes',
                        },
                    ],
                    graphName:
                        'Number of single participant on a meeting for 2/4 minutes',
                })
                break
        }
    }
    if (!selectedData) {
        onGraphSelected({ currentTarget: { value: 'oneperson_twominutes' } })
        return ''
    }

    return (
        <GraphContainer
            sm={12}
            header={
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5">
                        {selectedData.graphName}
                    </Typography>
                    <ToggleButtonGroup
                        value={selectedData.value}
                        exclusive
                        onChange={onGraphSelected}
                        aria-label="text alignment">
                        <ToggleButton
                            value="oneperson_twominutes"
                            aria-label="left aligned">
                            Single participant room for 2/4 min
                        </ToggleButton>
                        <ToggleButton value="duration" aria-label="centered">
                            Average duration
                        </ToggleButton>
                        <ToggleButton value="call" aria-label="right aligned">
                            Call started/ended
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            }>
            {selectedData && (
                <TimelineGraph
                    plots={selectedData.plots}
                    name={selectedData.graphName}
                />
            )}
        </GraphContainer>
    )
}

export default ParticipantAndDurationTimeline
