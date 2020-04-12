import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import {useSelector} from 'react-redux'

const TimelineGraph = ({selector, name}) => {

    const data = useSelector(selector)
    return <ResponsiveLine
        data={[{
            id: "toto",
            data: data,
        }]}
        margin={{top: 20, right: 10, bottom: 45, left: 30}}
        xScale={{type: 'point'}}
        yScale={{type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false}}
        curve="cardinal"
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: name,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{scheme: 'nivo'}}
        pointSize={10}
        pointColor={{theme: 'background'}}
        pointBorderWidth={2}
        pointBorderColor={{from: 'serieColor'}}
        pointLabel="y"
        enableArea={true}
        areaOpacity={0.55}
        useMesh={true}
    />

}

export default TimelineGraph
