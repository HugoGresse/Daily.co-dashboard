import { createSelector } from 'reselect'
import { getStartedMeetingByDay } from '../dailyCoSelectors'

export const getStartedMeetingByDayWithUpdatedCallDuration = createSelector(
    getStartedMeetingByDay,
    (meetingsByDay) => {
        return meetingsByDay.map((dayWithMeetings) => {
            const { dateTime, meetings } = dayWithMeetings

            return {
                dateTime,
                meetings: meetings.map((meeting) => ({
                    ...meeting,
                    duration_original: meeting.duration,
                    duration: processMeetingDuration(meeting),
                })),
            }
        })
    }
)

/**
 * A meeting duration represent the time in second where two people or more were at the same time in a given room/meeting.
 * Because a meeting can have more than 2 people, a meeting duration can be the sum of many duration where 2 or + people
 * where in the same room.
 *
 * For ex, if
 * John join the room room at 11h00
 * Barbie join at 11h02
 * Hugo join at 11h10
 * ---
 * John leave at 11h12
 * Hugo leave at 11h14
 * Barbie leave at 11h20
 * The call duration will be 12 minutes (from 11h02 to 11h14)
 *
 * If Katya join at 10h50 and leave at 11h01, then the call duration will be 13 minutes (1 minutes with Katya and John,
 * 12 minutes with John, Barbie and Hugo)
 *
 * @param meeting
 */
const processMeetingDuration = (meeting) => {
    const eventByTimestamp = {}

    // Count the number of join and leave by timestamp
    meeting.participants
        .map((user) => {
            //1. Add a new leave_time timestamp to each participant
            return {
                ...user,
                leave_time: user.join_time + user.duration,
            }
        })
        .forEach((user) => {
            if (eventByTimestamp[user.join_time]) {
                eventByTimestamp[user.join_time].join += 1
            } else {
                eventByTimestamp[user.join_time] = {
                    join: 1,
                    leave: 0,
                }
            }

            if (eventByTimestamp[user.leave_time]) {
                eventByTimestamp[user.leave_time].leave += 1
            } else {
                eventByTimestamp[user.leave_time] = {
                    join: 0,
                    leave: 1,
                }
            }
        })

    // Count the number of participant for each timestamp
    let participantCountTemp = 0
    const participantCountByTimestamp = {}
    Object.keys(eventByTimestamp)
        .sort()
        .forEach((key) => {
            const data = eventByTimestamp[key]

            participantCountTemp += data.join - data.leave
            participantCountByTimestamp[key] = participantCountTemp
        })

    // Calculate the final meeting duration
    let lastCount = 0
    let lastKey = null
    return Object.keys(participantCountByTimestamp).reduce((acc, key) => {
        const count = participantCountByTimestamp[key]
        let callDuration = 0
        if (count < 2 && lastCount > 1) {
            // The meeting contained more than 2 participants and is now either alone or no one in it
            callDuration += key - lastKey
        }
        lastKey = key
        lastCount = count
        return acc + callDuration
    }, 0)
}
