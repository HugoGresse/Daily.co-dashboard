import { createSelector } from 'reselect'
import { getStartedMeetingByDayWithUpdatedCallDuration } from './getStartedMeetingByDayWithUpdatedDuration'

export const getNumberOfRoomWithTwoOrMoreParticipantFor4MinutesSelector = createSelector(
    getStartedMeetingByDayWithUpdatedCallDuration,
    (meetingsByDay) => {
        const minimumCallDurationSec = 60 * 4
        return meetingsByDay.map((dayWithMeetings) => {
            const { dateTime, meetings } = dayWithMeetings

            const filteredMeetings = meetings
                .filter((meeting) => meeting.participants.length >= 2)
                .filter((meeting) => meeting.duration > minimumCallDurationSec)

            return {
                dateTime,
                y: filteredMeetings.length,
                x: `${dateTime.day}/${dateTime.month}`,
            }
        })
    }
)
