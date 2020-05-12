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
import { getNumberOfRoomWithTwoOrMoreParticipantFor4MinutesSelector } from '../data/selectors/getNumberOfRoomWithTwoOrMoreParticipantFor4MinutesSelector'
import { getUpdatedAverageDurationByDaySelector } from '../data/selectors/getAverageDurationByDaySelector'

const ParticipantAndDurationTimeline = () => {
    const [selectedData, setSelectedData] = useState(null)
    const onGraphSelected = (e) => {
        switch (e.currentTarget.value) {
            default:
            case 'avg_duration_2+': {
                setSelectedData({
                    value: e.currentTarget.value,
                    plots: [
                        {
                            selector: getUpdatedAverageDurationByDaySelector,
                            name: ' minutes',
                        },
                    ],
                    graphName:
                        'Avg call duration when 2+ people are in the call at the same time',
                })
                break
            }
            case '2+participant4+min':
                setSelectedData({
                    value: e.currentTarget.value,
                    plots: [
                        {
                            selector: getNumberOfRoomWithTwoOrMoreParticipantFor4MinutesSelector,
                            name: ' rooms',
                        },
                    ],
                    graphName:
                        'Number of room with 2+ people at the same time for 4+ minutes',
                })
                break
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
        onGraphSelected({ currentTarget: { value: 'avg_duration_2+' } })
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
                            value="avg_duration_2+"
                            aria-label="left aligned">
                            Call duration with 2+ participants
                        </ToggleButton>
                        <ToggleButton
                            value="oneperson_twominutes"
                            aria-label="left aligned">
                            Single participant room for 2/4 min
                        </ToggleButton>
                        <ToggleButton
                            value="2+participant4+min"
                            aria-label="centered">
                            2+ participants for 4+ min
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
