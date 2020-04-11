import React, {useState} from 'react'
import GraphContainer from './components/GraphContainer'
import {useSelector} from 'react-redux'
import {getCallByDayByMonthSelector} from '../data/selectors/getCallByDayByMonthSelector'
import {ResponsiveLine} from '@nivo/line'
import {getAverageParticipantsByDayByMonthSelector} from '../data/selectors/getAverageParticipantsByDayByMonthSelector'

const CallByDayTimeline = () => {
    const callData = useSelector(getCallByDayByMonthSelector)
    const participantsData = useSelector(getAverageParticipantsByDayByMonthSelector)

    const data = [
        {
            id: "Call started",
            data: callData,
            color: "#FF0000",
        }, {
            id: "Average participants",
            data: participantsData,
            color: "#0000FF"
        }]

    const [selectedData, setSelectedData] = useState(null)

    return <GraphContainer title="Call By day" sm={12}>
        <ResponsiveLine
            data={data.filter(item => {
                if(selectedData) {
                    if(item.id === selectedData.id) {
                        return 1
                    } else {
                        return 0
                    }
                } else {
                    return 1
                }
            })}
            margin={{top: 50, right: 110, bottom: 50, left: 60}}
            xScale={{type: 'point'}}
            yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false}}
            curve="cardinal"
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
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
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.55}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ],
                    onClick: (d) => {
                        if (selectedData) {
                            if (selectedData.id !== d.id) {
                                setSelectedData(d)
                            } else {
                                setSelectedData(null)
                            }

                        } else {
                            setSelectedData(d)
                        }
                    },
                }
            ]}
        />
    </GraphContainer>

}

export default CallByDayTimeline
