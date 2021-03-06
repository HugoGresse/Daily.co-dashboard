import { createSelector } from 'reselect'
import { getFilterSelector, getStartedMeetingByDay } from '../dailyCoSelectors'
import { FILTER_MODE_MAX, FILTER_MODE_MIN } from '../dailyCoActions'

export const getAloneParticipantForXMinutes = createSelector(
    getStartedMeetingByDay,
    getFilterSelector,
    (meetingsByDay, filter) => {
        return meetingsByDay.map((dayWithMeetings) => {
            const { dateTime, meetings } = dayWithMeetings

            const filteredMeetings = meetings
                .filter((meeting) => meeting.participants.length === 1)
                .filter((meeting) => {
                    switch (filter.mode) {
                        default:
                        case FILTER_MODE_MIN:
                            return meeting.duration >= filter.minutes
                        case FILTER_MODE_MAX:
                            return meeting.duration <= filter.minutes
                    }
                })

            return {
                dateTime,
                y: filteredMeetings.length,
                x: `${dateTime.day}/${dateTime.month}`,
            }
        })
    }
)
