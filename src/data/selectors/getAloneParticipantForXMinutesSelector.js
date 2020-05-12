import { createSelector } from 'reselect'
import { getStartedMeetingByDay } from '../dailyCoSelectors'

export const getAloneParticipantFor2Minutes = createSelector(
    getStartedMeetingByDay,
    (meetingsByDay) => {
        const minimumCallDurationSec = 60 * 2
        return meetingsByDay.map((dayWithMeetings) => {
            const { dateTime, meetings } = dayWithMeetings

            const filteredMeetings = meetings
                .filter((meeting) => meeting.participants.length === 1)
                .filter((meeting) => meeting.duration > minimumCallDurationSec)

            return {
                dateTime,
                y: filteredMeetings.length,
                x: `${dateTime.day}/${dateTime.month}`,
            }
        })
    }
)

export const getAloneParticipantFor4Minutes = createSelector(
    getStartedMeetingByDay,
    (meetingsByDay) => {
        const minimumCallDurationSec = 60 * 4
        return meetingsByDay.map((dayWithMeetings) => {
            const { dateTime, meetings } = dayWithMeetings

            const filteredMeetings = meetings
                .filter((meeting) => meeting.participants.length === 1)
                .filter((meeting) => meeting.duration > minimumCallDurationSec)

            return {
                dateTime,
                y: filteredMeetings.length,
                x: `${dateTime.day}/${dateTime.month}`,
            }
        })
    }
)
