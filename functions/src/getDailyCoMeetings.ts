import * as functions from 'firebase-functions'
import fetch from 'node-fetch'
import * as querystring from 'querystring'

export const getDailyCoMeetings = functions.https.onCall((data) => {
    const { dailyco } = functions.config()

    if (!dailyco || !dailyco.apikey) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'Missing env config'
        )
    }

    const params: { [key: string]: string } = {}
    if (data) {
        if (data.startingAfter) params.starting_after = data.startingAfter
        if (data.timeframeStart) params.timeframe_start = data.timeframeStart
        if (data.timeframeEnd) params.timeframe_end = data.timeframeEnd
    }

    const endpoint = `https://api.daily.co/v1/meetings?${querystring.stringify(
        params
    )}`

    return fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dailyco.apikey}`,
        },
    }).then((result) => result.json())
})
