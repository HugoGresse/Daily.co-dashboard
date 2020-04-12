import { createSelector } from 'reselect'
import { getMeetingByDay } from '../dailyCoSelectors'

export const getCallByDayByMonthSelector = createSelector(
  getMeetingByDay,
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
