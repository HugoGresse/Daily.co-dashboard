import React, { useEffect, useState } from 'react'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import TimelineGraph from './TimelineGraph'
import GraphContainer from './components/GraphContainer'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { getAloneParticipantForXMinutes } from '../data/selectors/getAloneParticipantForXMinutesSelector'
import { getNumberOfRoomWithTwoOrMoreParticipantForXMinutesSelector } from '../data/selectors/getNumberOfRoomWithTwoOrMoreParticipantForXMinutesSelector'
import { getUpdatedAverageDurationByDaySelector } from '../data/selectors/getAverageDurationByDaySelector'
import {
    FILTER_MODE_MAX,
    FILTER_MODE_MIN,
    setFilter,
} from '../data/dailyCoActions'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterSelector } from '../data/dailyCoSelectors'
import TextField from '@material-ui/core/TextField'

const GRAPH_AVG_DURATION = 'avg_duration_2+'
const GRAPH_ROOM_NMB_2PART = '2+participantxmin'
const GRAPH_ONE_PERSON_XMIN = 'oneperson_xminutes'
const ParticipantAndDurationTimeline = () => {
    const [selectedData, setSelectedData] = useState(null)
    const [selectedGraph, setSelectedGraph] = useState(GRAPH_AVG_DURATION)
    const currentFilter = useSelector(getFilterSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        switch (selectedGraph) {
            default:
            case GRAPH_AVG_DURATION: {
                setSelectedData({
                    value: selectedGraph,
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
            case GRAPH_ROOM_NMB_2PART:
                setSelectedData({
                    value: selectedGraph,
                    plots: [
                        {
                            selector: getNumberOfRoomWithTwoOrMoreParticipantForXMinutesSelector,
                            name: ' rooms',
                        },
                    ],
                    graphName: `Number of room with 2+ people at the same time for ${currentFilter.minutes} minutes`,
                })
                break
            case GRAPH_ONE_PERSON_XMIN:
                setSelectedData({
                    value: selectedGraph,
                    plots: [
                        {
                            selector: getAloneParticipantForXMinutes,
                            name: ` alone people for ${currentFilter.minutes} minutes`,
                        },
                    ],
                    graphName: `Number of single participant on a meeting for ${currentFilter.minutes} minutes`,
                })
                break
        }
    }, [
        selectedGraph,
        setSelectedData,
        currentFilter.minutes,
        currentFilter.mode,
    ])

    const onFilterMinuteChange = (e) => {
        const minutes = e.currentTarget.value
            ? parseInt(e.currentTarget.value)
            : 0
        dispatch(setFilter(currentFilter.mode, minutes))
    }
    const onFilterModeChange = (e) => {
        dispatch(
            setFilter(parseInt(e.currentTarget.value), currentFilter.minutes)
        )
    }

    const onGraphSelected = (e) => {
        setSelectedGraph(e.currentTarget.value)
    }

    if (!selectedData) {
        return ''
    }

    return (
        <GraphContainer
            sm={12}
            header={
                <>
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
                                value={GRAPH_AVG_DURATION}
                                aria-label="left aligned">
                                Call duration with 2+ participants
                            </ToggleButton>
                            <ToggleButton
                                value={GRAPH_ONE_PERSON_XMIN}
                                aria-label="left aligned">
                                Single participant room for{' '}
                                {currentFilter.minutes} min
                            </ToggleButton>
                            <ToggleButton
                                value={GRAPH_ROOM_NMB_2PART}
                                aria-label="centered">
                                2+ participants for {currentFilter.minutes} min
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    {selectedGraph !== GRAPH_AVG_DURATION && (
                        <Box display="flex" justifyContent="flex-end">
                            <TextField
                                id="minutes"
                                label="Minutes"
                                type="number"
                                value={currentFilter.minutes}
                                onChange={onFilterMinuteChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <ToggleButtonGroup
                                value={currentFilter.mode}
                                exclusive
                                onChange={onFilterModeChange}
                                aria-label="text alignment">
                                <ToggleButton
                                    value={FILTER_MODE_MIN}
                                    aria-label="left aligned">
                                    MIN
                                </ToggleButton>
                                <ToggleButton
                                    value={FILTER_MODE_MAX}
                                    aria-label="left aligned">
                                    MAX
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    )}
                </>
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
