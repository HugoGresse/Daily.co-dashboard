import { createSelector } from 'reselect'
import { getStartedMeetingByDay } from '../dailyCoSelectors'

export const getStartedCallByDaySelector = createSelector(
    getStartedMeetingByDay,
    (meetingsByDay) => {
        return meetingsByDay.map((dayWithMeetings) => {
            const { dateTime, meetings } = dayWithMeetings

            return {
                dateTime,
                y: meetings.length,
                x: `${dateTime.day}/${dateTime.month}`,
            }
        })
    }
)
