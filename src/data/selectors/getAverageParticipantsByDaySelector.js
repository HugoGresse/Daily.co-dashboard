import {createSelector} from 'reselect'
import {getMeetingByDay} from '../dailyCoSelectors'

export const getAverageParticipantsByDaySelector = createSelector(
    getMeetingByDay,
    meetingsByDay => {
        return meetingsByDay.map(dayWithMeetings => {
            const {dateTime, meetings} = dayWithMeetings

            const sum = meetings.reduce((acc, meeting) => {
                acc += meeting.participants.length
                return acc
            }, 0)

            return {
                dateTime,
                y: sum / meetings.length,
                x: `${dateTime.day}/${dateTime.month}`
            }
        })
    }
)
