export const MEETINGS_GET_SUCCESS = 'dailyCo/meeting/get/success'
export const MEETINGS_LOADING = 'dailyCo/meeting/loading'
export const MEETINGS_LOADED = 'dailyCo/meeting/loaded'

const initState = {
    data: [],
    loaded: false,
    loading: true,
    meetingCount: 0
}

const dailyCoReducer = (state = initState, { payload, type }) => {
    switch (type) {
        case MEETINGS_LOADING:
            return {
                ...state,
                loading: true,
            }
        case MEETINGS_LOADED:
            return {
                ...state,
                loading: false,
                loaded: true,
            }
        case MEETINGS_GET_SUCCESS:
            return {
                ...state,
                data: [...payload.data],
                meetingCount: payload.meetingCount
            }
        default:
            return state
    }
}

export default dailyCoReducer
