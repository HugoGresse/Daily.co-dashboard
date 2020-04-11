import {createSelector} from 'reselect'
import {getMeetingsSelector} from '../dailyCoSelectors'

export const getAverageTalkDurationSelector = createSelector(
    getMeetingsSelector,
    meetings => {

        const meetingDurations = {
            "1min": 0,
            "2min": 0,
            "5min": 0,
            "10min":0,
            "30min": 0,
            "30min+": 0
        }

        meetings.forEach(meeting => {
            if(meeting.duration <= 60) {
                meetingDurations["1min"] +=1
            } else if(meeting.duration <= (60 * 2)) {
                meetingDurations["2min"] +=1
            } else if(meeting.duration <= (60 * 5)) {
                meetingDurations["5min"] +=1
            } else if(meeting.duration <= (60 * 10)) {
                meetingDurations["10min"] +=1
            } else if(meeting.duration <= (60 * 30)) {
                meetingDurations["30min"] +=1
            } else {
                meetingDurations["30min+"] +=1
            }
        })

        return [
            {
                id: "1min",
                label: "1min or less",
                value: meetingDurations["1min"]
            },
            {
                id: "2min",
                label: "from 1min to 2min",
                value: meetingDurations["2min"]
            },
            {
                id: "5min",
                label: "from 2min to 5min",
                value: meetingDurations["1min"]
            },
            {
                id: "10min",
                label: "from 5min to 10min",
                value: meetingDurations["1min"]
            },
            {
                id: "30min",
                label: "from 10min to 30min",
                value: meetingDurations["30min"]
            },
            {
                id: "30min+",
                label: "more than 30min",
                value: meetingDurations["30min+"]
            },
        ]
    }
)
