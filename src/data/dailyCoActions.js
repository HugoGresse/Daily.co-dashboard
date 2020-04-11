import {MEETINGS_GET_SUCCESS} from './dailyCoReducer'
import {isLoadedSelector} from './dailyCoSelectors'

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
        }
    } else {

        const result = await fetchMeetings()
        console.log(result)
        meetings.push(...result.data)
    }

    dispatch({
        type: MEETINGS_GET_SUCCESS,
        payload: {
            meetingCount: meetings.length,
            data: meetings
        }
    })
}

const fetchMeetings = async (startingAfter) => {
    const endpoint = startingAfter ? `https://api.daily.co/v1/meetings?starting_after=${startingAfter}` : 'https://api.daily.co/v1/meetings'
    return fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_DAILY_CO}`
        },
    })
        .then(result => result.json())
}
