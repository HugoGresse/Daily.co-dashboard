import React, { useState } from 'react'
import { getCallByDayByMonthSelector } from '../data/selectors/getCallByDayByMonthSelector'
import { getAverageParticipantsByDaySelector } from '../data/selectors/getAverageParticipantsByDaySelector'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import TimelineGraph from './TimelineGraph'
import GraphContainer from './components/GraphContainer'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { getAverageParticipantsByDayByMonthSelector } from '../data/selectors/getAverageDurationByDaySelector'

const Timeline = () => {
  const [selectedData, setSelectedData] = useState(null)

  const onGraphSelected = (e) => {
    switch (e.currentTarget.value) {
      case 'participants':
        setSelectedData({
          value: e.currentTarget.value,
          selector: getAverageParticipantsByDaySelector,
          graphName: 'Average participants by call',
        })
        break
      case 'duration':
        setSelectedData({
          value: e.currentTarget.value,
          selector: getAverageParticipantsByDayByMonthSelector,
          graphName: 'Average call duration (minutes)',
        })
        break
      default:
      case 'call':
        setSelectedData({
          value: e.currentTarget.value,
          selector: getCallByDayByMonthSelector,
          graphName: 'Number of call started/ended',
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
          <Typography variant="h5">{selectedData.graphName}</Typography>
          <ToggleButtonGroup
            value={selectedData.value}
            exclusive
            onChange={onGraphSelected}
            aria-label="text alignment">
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
      }>
      {selectedData && (
        <TimelineGraph
          selector={selectedData.selector}
          name={selectedData.graphName}
        />
      )}
    </GraphContainer>
  )
}

export default Timeline
