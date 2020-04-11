import React from 'react'
import GraphContainer from './components/GraphContainer'
import {useSelector} from 'react-redux'
import {ResponsivePie} from '@nivo/pie'
import {getNumberOfParticipantsSelector} from '../data/selectors/getNumberOfParticipantsSelector'

const NumberOfParticipants = () => {
    const data = useSelector(getNumberOfParticipantsSelector)

    return  <GraphContainer title="Number of participants by call">
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
            innerRadius={0.5}
            cornerRadius={3}
            colors={{ scheme: 'nivo' }}
            radialLabelsSkipAngle={10}
            slicesLabelsSkipAngle={10}
            animate={true}
            motionStiffness={90}
            motionDamping={15}

        />
    </GraphContainer>
}

export default NumberOfParticipants
