import React from 'react'
import GraphContainer from './components/GraphContainer'
import {useSelector} from 'react-redux'
import {getDayGroupSelector, getStartTimeByDaySelector} from '../data/selectors/getStartTimeByDaySelector'
import {ResponsiveSwarmPlot} from '@nivo/swarmplot'

const StartTimeByDay = () => {
    const data = useSelector(getStartTimeByDaySelector)
    const groups = useSelector(getDayGroupSelector)

    if(groups.length <= 0) {
        return ""
    }

    return  <GraphContainer title="Start Time By Day" xs={12} sm={8}>
        <ResponsiveSwarmPlot
            data={data}
            groups={groups}
            value="hour"
            valueScale={{ type: 'linear', min: 0, max: 24, reverse: true }}
            size={{ key: 'volume', values: [ 4, 20 ], sizes: [ 6, 20 ] }}
            forceStrength={4}
            simulationIterations={100}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.6
                    ],
                    [
                        'opacity',
                        0.5
                    ]
                ]
            }}
            margin={{ bottom: 50, left: 50, top: 50 }}
            axisBottom={{
                orient: 'bottom',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'week day',
                legendPosition: 'middle',
                legendOffset: 40
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'hour',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            motionStiffness={50}
            motionDamping={10}
        />
    </GraphContainer>

}

export default StartTimeByDay
