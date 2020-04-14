import { createSelector } from 'reselect'
import { getMeetingsSelector } from '../dailyCoSelectors'
import { DateTime } from 'luxon'

export const getStartTimeByDaySelector = createSelector(
    getMeetingsSelector,
    (meetings) => {
        const meetingsByWeekday = meetings
            .map((meeting, index) => {
                const dateTime = DateTime.fromSeconds(meeting.start_time)

                return {
                    id: index,
                    group: dateTime.weekdayLong,
                    weekday: dateTime.weekday,
                    hour: dateTime.hour,
                    volume: 1,
                }
            })
            .reduce((acc, meeting) => {
                const key = meeting.group + meeting.hour
                if (!acc[key]) {
                    acc[key] = meeting
                } else {
                    acc[key].volume += 1
                }

                return acc
            }, {})

        return Object.values(meetingsByWeekday)
    }
)

export const getDayGroupSelector = createSelector(
    getStartTimeByDaySelector,
    (meetings) => {
        return meetings
            .reduce((acc, item) => {
                const key = `${item.weekday} - ${item.group}`
                if (acc.indexOf(key) < 0) {
                    acc.push(key)
                }

                return acc
            }, [])
            .sort()
            .map((item) => item.split(' - ')[1])
    }
)

export const getMinMaxVolumes = createSelector(
    getStartTimeByDaySelector,
    (meetings) => {
        const min = meetings.reduce(
            (acc, curr) => (acc < curr.volume ? acc : curr.volume),
            0
        )
        const max = meetings.reduce(
            (acc, curr) => (acc > curr.volume ? acc : curr.volume),
            0
        )

        return [min, max]
    }
)
