import { createSelector } from 'reselect'
import { getStartedMeetingByDay } from '../dailyCoSelectors'

export const getAverageParticipantsByDaySelector = createSelector(
    getStartedMeetingByDay,
    (meetingsByDay) => {
        return meetingsByDay.map((dayWithMeetings) => {
            const { dateTime, meetings } = dayWithMeetings

            const sum = meetings.reduce((acc, meeting) => {
                acc += meeting.participants.length
                return acc
            }, 0)

            return {
                dateTime,
                y: Math.round((sum / meetings.length) * 100) / 100,
                x: `${dateTime.day}/${dateTime.month}`,
            }
        })
    }
)
