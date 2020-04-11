export const MEETINGS_GET_SUCCESS = 'dailyCo/meeting/get/success'

const initState = {
    data: [],
    loaded: false,
    meetingCount: 0
}

const dailyCoReducer = (state = initState, { payload, type }) => {
    switch (type) {
        case MEETINGS_GET_SUCCESS:
            return {
                ...state,
                data: [...payload.data],
                meetingCount: payload.meetingCount,
                loaded: true
            }
        default:
            return state
    }
}

export default dailyCoReducer
