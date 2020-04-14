import React from 'react'
import GraphContainer from './components/GraphContainer'
import { useSelector } from 'react-redux'
import {
    getDayGroupSelector,
    getMinMaxVolumes,
    getStartTimeByWeekdaySelector,
} from '../data/selectors/getStartTimeByWeekdaySelector'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    tooltip: {
        padding: '3px 5px',
        borderRadius: 4,
        boxShadow: '0 1px 4px #999',
        backgroundColor: '#FFF',
        maxWidth: '40vw',
    },
}))

const StartTimeByWeekday = () => {
    const data = useSelector(getStartTimeByWeekdaySelector)
    const groups = useSelector(getDayGroupSelector)
    const [min, max] = useSelector(getMinMaxVolumes)
    const classes = useStyles()

    if (groups.length <= 0) {
        return ''
    }

    return (
        <GraphContainer title="Start Time By Day" xs={12} sm={8}>
            <ResponsiveSwarmPlot
                data={data}
                groups={groups}
                value="hour"
                valueScale={{ type: 'linear', min: 0, max: 24, reverse: true }}
                size={{ key: 'volume', values: [min, max], sizes: [2, 32] }}
                forceStrength={0.2}
                simulationIterations={120}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        ['darker', 0.6],
                        ['opacity', 0.5],
                    ],
                }}
                margin={{ bottom: 50, left: 50, top: 50 }}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'week day',
                    legendPosition: 'middle',
                    legendOffset: 40,
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'hour',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                motionStiffness={50}
                motionDamping={10}
                tooltip={({ node }) => {
                    if (node.data) {
                        return (
                            <div className={classes.tooltip}>
                                <div>
                                    {node.data.group} {node.data.hour}h00 >{' '}
                                    {node.data.hour + 1}h00
                                </div>
                                <div>
                                    <b>{node.data.volume} room(s)</b>
                                </div>
                            </div>
                        )
                    }
                }}
            />
        </GraphContainer>
    )
}

export default StartTimeByWeekday
