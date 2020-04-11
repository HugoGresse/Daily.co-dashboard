import {createSelector} from 'reselect'
import {getMeetingsSelector} from '../dailyCoSelectors'
import {DateTime} from 'luxon'

export const getCallByDayByMonthSelector = createSelector(
    getMeetingsSelector,
    meetings => {
        const meetingsByDay = meetings
            .reduce((acc, meeting) => {
                const dateTime = DateTime.fromSeconds(meeting.start_time)
                const date = dateTime.toISODate()
                if(!acc[date]){
                    acc[date] = {
                        x: date,
                        y: 0,
                        dateTime:dateTime
                    }
                }

                acc[date].y ++

                return acc
            }, {})

        return Object.values(meetingsByDay).sort((a, b) => {
            return a.dateTime.toSeconds() > b.dateTime.toSeconds() ? 1 : -1
        }).map(item => {
            console.log(item)
            return {
                ...item,
                x: `${item.dateTime.day}/${item.dateTime.month}`
            }
        })
    }
)
