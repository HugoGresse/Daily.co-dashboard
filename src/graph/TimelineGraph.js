import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useSelector } from 'react-redux'

const emptyFunction = () => {}

const TimelineGraph = ({ plots, name }) => {
    const idData0 = 0
    const idData1 = 1
    const firstPlot = plots[idData0]
    const secondPlot = plots[idData1]
    const data0 = useSelector(firstPlot.selector)
    const data1 = useSelector(
        (secondPlot && secondPlot.selector) || emptyFunction
    )

    const graphData = [
        {
            id: idData0,
            data: data0,
        },
    ]

    const additionalProps = {}

    if (secondPlot) {
        graphData.push({
            id: idData1,
            data: data1,
        })
    }

    additionalProps.sliceTooltip = SliceTooltip(plots.map((item) => item.name))
    additionalProps.enableSlices = 'x'

    return (
        <ResponsiveLine
            data={graphData}
            margin={{ top: 20, right: 10, bottom: 45, left: 30 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
                stacked: false,
                reverse: false,
            }}
            curve="cardinal"
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: name,
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            enableArea={true}
            areaOpacity={0.3}
            useMesh={true}
            {...additionalProps}
        />
    )
}

const SliceTooltip = (plotNames) => ({ slice }) => {
    return (
        <div
            style={{
                padding: 5,
                borderRadius: 5,
                boxShadow: '0 1px 4px #999',
                backgroundColor: '#FFF',
                maxWidth: '40vw',
            }}>
            {slice.points.map((point) => (
                <div
                    key={point.id}
                    style={{
                        color: point.serieColor,
                    }}>
                    <strong>
                        {point.data.yFormatted} {plotNames[point.serieId]}
                    </strong>{' '}
                    <br />
                </div>
            ))}
        </div>
    )
}

export default TimelineGraph
