import {MEETINGS_GET_SUCCESS} from './dailyCoReducer'
import {isLoadedSelector} from './dailyCoSelectors'
import {functions} from './firebase'

export const getMeetings = (fetchAll = false) => async (dispatch, getState) => {
    if(isLoadedSelector(getState())) {
        return
    }

    const meetings = []
    if(fetchAll) {
        let timestampStartingAfter = 0
        while(true) {
            const result = await fetchMeetings(timestampStartingAfter)
            if(result.data.length === 0) {
                break;
            }
            meetings.push(...result.data)
            timestampStartingAfter = result.data[result.data.length - 1].id
            dispatch({
                type: MEETINGS_GET_SUCCESS,
                payload: {
                    meetingCount: meetings.length,
                    data: meetings
                }
            })
        }
    } else {
        const result = await fetchMeetings()
        meetings.push(...result.data)
        dispatch({
            type: MEETINGS_GET_SUCCESS,
            payload: {
                meetingCount: meetings.length,
                data: meetings
            }
        })
    }

}

const fetchMeetings = async (startingAfter) => {
    const result =  await functions.getDailyCoMeetings({
        startingAfter: startingAfter
    })

    if(!result || !result.data) {
        throw new Error('something went wrong')
    }

    return result.data
}
