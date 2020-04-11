import {createSelector} from 'reselect'
import {getMeetingsSelector} from '../dailyCoSelectors'

export const getNumberOfParticipantsSelector = createSelector(
    getMeetingsSelector,
    meetings => {

        const participants = {}

        meetings.forEach(meeting => {
            const count = meeting.participants.length
            if(!participants[count]) {
                participants[count] = 0
            }
            participants[count] += 1
        })

        return Object.keys(participants)
            .map(participantCount => {
                return {
                    id: participantCount,
                    label: `${participantCount} participant(s)`,
                    value: participants[participantCount]
                }
            })
    }
)
