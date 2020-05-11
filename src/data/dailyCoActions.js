import {
    MEETINGS_GET_SUCCESS,
    MEETINGS_LOADED,
    MEETINGS_LOADING,
    SET_DATES,
} from './dailyCoReducer'
import {
    getEndDateSelector,
    getStartDateSelector,
    isLoadedSelector,
} from './dailyCoSelectors'
import { functions } from './firebase'

export const getMeetings = (fetchAll = false) => async (dispatch, getState) => {
    const startDate = getStartDateSelector(getState())
    const endDate = getEndDateSelector(getState())

    console.log(startDate, endDate)

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

export const setDates = (startDate, endDate) => async (dispatch) => {
    const payload = {}
    if (startDate) {
        payload.startDate = startDate
    }
    if (endDate) {
        payload.endDate = endDate
    }
    dispatch({
        type: SET_DATES,
        payload,
    })
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
