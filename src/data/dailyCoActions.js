import {
  MEETINGS_GET_SUCCESS,
  MEETINGS_LOADED,
  MEETINGS_LOADING,
} from './dailyCoReducer'
import { isLoadedSelector } from './dailyCoSelectors'
import { functions } from './firebase'

export const getMeetings = (fetchAll = false) => async (dispatch, getState) => {
  if (isLoadedSelector(getState())) {
    return
  }

  dispatch({
    type: MEETINGS_LOADING,
  })

  const meetings = []
  if (fetchAll) {
    let timestampStartingAfter = 0
    while (true) {
      const result = await fetchMeetings(timestampStartingAfter)
      if (result.data.length === 0) {
        break
      }
      meetings.push(...result.data)
      timestampStartingAfter = result.data[result.data.length - 1].id
      dispatch({
        type: MEETINGS_GET_SUCCESS,
        payload: {
          meetingCount: meetings.length,
          data: meetings,
        },
      })
    }

    dispatch({
      type: MEETINGS_LOADED,
    })
  } else {
    const result = await fetchMeetings()
    meetings.push(...result.data)
    dispatch({
      type: MEETINGS_GET_SUCCESS,
      payload: {
        meetingCount: meetings.length,
        data: meetings,
      },
    })
    dispatch({
      type: MEETINGS_LOADED,
    })
  }
}

const fetchMeetings = async (startingAfter) => {
  const result = await functions.getDailyCoMeetings({
    startingAfter: startingAfter,
  })

  if (!result || !result.data) {
    throw new Error('something went wrong')
  }

  return result.data
}
