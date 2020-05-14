import {
    MEETINGS_GET_SUCCESS,
    MEETINGS_LOADED,
    MEETINGS_LOADING,
    SET_DATES,
    SET_FILTER,
} from './dailyCoReducer'
import {
    getEndDateSelector,
    getIdLoadingSelector,
    getStartDateSelector,
} from './dailyCoSelectors'
import { functions } from './firebase'

export const getMeetings = () => async (dispatch, getState) => {
    const startDate = getStartDateSelector(getState())
    const endDate = getEndDateSelector(getState())
    const idLoading = Date.now()

    dispatch({
        type: MEETINGS_LOADING,
        payload: idLoading,
    })

    const meetings = []

    let startingAfterId = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const existingIdLoading = getIdLoadingSelector(getState())
        if (existingIdLoading && existingIdLoading !== idLoading) {
            console.info('Canceling previous load')
            break
        }
        const result = await fetchMeetings(startingAfterId, startDate, endDate)
        if (result.data.length === 0) {
            break
        }
        meetings.push(...result.data)
        startingAfterId = result.data[result.data.length - 1].id
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

export const FILTER_MODE_MIN = 1
export const FILTER_MODE_MAX = 2
export const setFilter = (mode, minutes) => (dispatch) => {
    dispatch({
        type: SET_FILTER,
        payload: {
            mode,
            minutes,
        },
    })
}

const fetchMeetings = async (startingAfter, timeframeStart, timeframeEnd) => {
    const result = await functions.getDailyCoMeetings({
        startingAfter,
        timeframeStart,
        timeframeEnd,
    })

    if (!result || !result.data) {
        throw new Error('something went wrong')
    }

    return result.data
}
