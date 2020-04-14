import { createSelector } from 'reselect'
import { DateTime } from 'luxon'

export const getDailyCoSelector = (state) => state.dailyCo
export const getMeetingsSelector = (state) => getDailyCoSelector(state).data
export const isLoadedSelector = (state) => getDailyCoSelector(state).loaded
export const isLoadingSelector = (state) => getDailyCoSelector(state).loading

export const getStartedMeetingByDay = createSelector(
    getMeetingsSelector,
    (meetings) => {
        const meetingsByDay = meetings.reduce((acc, meeting) => {
            const dateTime = DateTime.fromSeconds(meeting.start_time)
            const date = dateTime.toISODate()
            if (!acc[date]) {
                acc[date] = {
                    dateTime: dateTime,
                    meetings: [],
                }
            }

            acc[date].meetings.push(meeting)

            return acc
        }, {})

        return Object.values(meetingsByDay).sort((a, b) => {
            return a.dateTime.toSeconds() > b.dateTime.toSeconds() ? 1 : -1
        })
    }
)
