import { createSelector } from 'reselect'
import { getStartedMeetingByDay } from '../dailyCoSelectors'
import { getStartedMeetingByDayWithUpdatedCallDuration } from './getStartedMeetingByDayWithUpdatedDuration'

export const getAverageDurationByDaySelector = createSelector(
    getStartedMeetingByDay,
    (meetingsByDay) => getAvgDuration(meetingsByDay)
)

export const getUpdatedAverageDurationByDaySelector = createSelector(
    getStartedMeetingByDayWithUpdatedCallDuration,
    (meetingsByDay) => getAvgDuration(meetingsByDay)
)

const getAvgDuration = (meetingsByDay) => {
    return meetingsByDay.map((dayWithMeetings) => {
        const { dateTime, meetings } = dayWithMeetings

        const sum = meetings.reduce((acc, meeting) => {
            acc += meeting.duration
            return acc
        }, 0)

        return {
            dateTime,
            y: Math.round((sum / meetings.length / 60) * 100) / 100,
            x: `${dateTime.day}/${dateTime.month}`,
        }
    })
}
