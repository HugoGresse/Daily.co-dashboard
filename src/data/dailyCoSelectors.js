export const getDailyCoSelector = state => state.dailyCo
export const getMeetingsSelector = state => getDailyCoSelector(state).data
export const isLoadedSelector = state => getDailyCoSelector(state).loaded
export const isLoadingSelector = state => !getDailyCoSelector(state).loaded && getMeetingsSelector(state).length === 0
