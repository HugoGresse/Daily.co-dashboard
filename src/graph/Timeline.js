import React, {useState} from 'react'
import {getCallByDayByMonthSelector} from '../data/selectors/getCallByDayByMonthSelector'
import {getAverageParticipantsByDayByMonthSelector} from '../data/selectors/getAverageParticipantsByDayByMonthSelector'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import TimelineGraph from './TimelineGraph'
import GraphContainer from './components/GraphContainer'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Timeline = () => {
    const [selectedData, setSelectedData] = useState(null)
        console.log(selectedData)

    const onGraphSelected = (e) => {
        switch (e.currentTarget.value) {
            case "participants" :
                setSelectedData({
                    selector: getAverageParticipantsByDayByMonthSelector,
                    graphName: 'Average participants by call'
                })
                break;
            case "duration" :
                // TODO
                setSelectedData({
                    selector: getCallByDayByMonthSelector,
                    graphName: 'Average call duration'
                })

                break;
            default:
            case "call" :
                setSelectedData({
                    selector: getCallByDayByMonthSelector,
                    graphName: 'Number of call started/ended'
                })
        }
    }
    if (!selectedData) {
        onGraphSelected({currentTarget: {value: "call"}})
        return ""
    }

    return <GraphContainer
        sm={12}
        header={
        <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">{selectedData.graphName}</Typography>
            <ToggleButtonGroup
                value="left"
                exclusive
                onChange={onGraphSelected}
                aria-label="text alignment"
            >
                <ToggleButton value="participants" aria-label="left aligned">
                    Participants
                </ToggleButton>
                <ToggleButton value="duration" aria-label="centered">
                    Average duration
                </ToggleButton>
                <ToggleButton value="call" aria-label="right aligned">
                    Call started/ended
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    }
                           >


        {selectedData && <TimelineGraph
            selector={selectedData.selector}
            name={selectedData.graphName}
        />}
    </GraphContainer>

}

export default Timeline
