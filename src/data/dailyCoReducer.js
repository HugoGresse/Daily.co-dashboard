import { FILTER_MODE_MIN } from './dailyCoActions'

export const MEETINGS_GET_SUCCESS = 'dailyCo/meeting/get/success'
export const MEETINGS_LOADING = 'dailyCo/meeting/loading'
export const MEETINGS_LOADED = 'dailyCo/meeting/loaded'
export const SET_DATES = 'dailyCo/meeting/setDate'
export const SET_FILTER = 'dailyCo/meeting/setFilter'

const oneWeekAgo = new Date()
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

const initState = {
    data: [],
    startDate: oneWeekAgo.getTime() / 1000,
    endDate: Date.now() / 1000,
    loaded: false,
    loading: true,
    idLoading: null,
    meetingCount: 0,
    filter: {
        mode: FILTER_MODE_MIN,
        minutes: 4,
    },
}

const dailyCoReducer = (state = initState, { payload, type }) => {
    switch (type) {
        case SET_DATES:
            return {
                ...state,
                ...payload,
                data: [],
            }
        case MEETINGS_LOADING:
            return {
                ...state,
                loading: true,
                idLoading: payload,
            }
        case MEETINGS_LOADED:
            return {
                ...state,
                loading: false,
                loaded: true,
                idLoading: null,
            }
        case MEETINGS_GET_SUCCESS:
            return {
                ...state,
                data: [...payload.data],
                meetingCount: payload.meetingCount,
            }
        case SET_FILTER:
            return {
                ...state,
                filter: payload,
            }
        default:
            return state
    }
}

export default dailyCoReducer
