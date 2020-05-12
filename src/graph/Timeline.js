import React, { useState } from 'react'
import { getStartedCallByDaySelector } from '../data/selectors/getStartedCallByDaySelector'
import { getAverageParticipantsByDaySelector } from '../data/selectors/getAverageParticipantsByDaySelector'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import TimelineGraph from './TimelineGraph'
import GraphContainer from './components/GraphContainer'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { getAverageDurationByDaySelector } from '../data/selectors/getAverageDurationByDaySelector'

const Timeline = () => {
    const [selectedData, setSelectedData] = useState(null)
    const onGraphSelected = (e) => {
        switch (e.currentTarget.value) {
            case 'participants':
                setSelectedData({
                    value: e.currentTarget.value,
                    plots: [
                        {
                            selector: getAverageParticipantsByDaySelector,
                            name: ' average participants',
                        },
                    ],
                    graphName: 'Average participants by call',
                })
                break
            case 'duration':
                setSelectedData({
                    value: e.currentTarget.value,
                    plots: [
                        {
                            selector: getAverageDurationByDaySelector,
                            name: ' average min',
                        },
                    ],
                    graphName:
                        'Average room duration (minutes, 1+ participants)',
                })
                break
            default:
            case 'call':
                setSelectedData({
                    value: e.currentTarget.value,
                    plots: [
                        {
                            selector: getStartedCallByDaySelector,
                            name: 'started call',
                        },
                    ],
                    graphName: 'Number of call started',
                })
        }
    }
    if (!selectedData) {
        onGraphSelected({ currentTarget: { value: 'call' } })
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
                            value="participants"
                            aria-label="left aligned">
                            Participants
                        </ToggleButton>
                        <ToggleButton value="duration" aria-label="centered">
                            Average duration
                        </ToggleButton>
                        <ToggleButton value="call" aria-label="right aligned">
                            Call started
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

export default Timeline
