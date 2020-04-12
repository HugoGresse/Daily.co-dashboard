import * as functions from 'firebase-functions'
import fetch from 'node-fetch'

export const getDailyCoMeetings = functions.https.onCall((data) => {
  const { dailyco } = functions.config()

  if (!dailyco || !dailyco.apikey) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Missing env config'
    )
  }

  const startingAfter = data ? data.startingAfter : null

  const endpoint = startingAfter
    ? `https://api.daily.co/v1/meetings?starting_after=${startingAfter}`
    : 'https://api.daily.co/v1/meetings'
  return fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dailyco.apikey}`,
    },
  }).then((result) => result.json())
})
