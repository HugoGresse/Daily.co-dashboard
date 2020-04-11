export const getDailyCoSelector = state => state.dailyCo
export const getMeetingsSelector = state => getDailyCoSelector(state).data
export const isLoadedSelector = state => getDailyCoSelector(state).loaded

/**
 *
 id: "c8bdf460-577a-4227-f360-7d24a55788c0"
 room: "CDLCdhuSZflBNpcE4JnX"
 start_time: 1586545796
 duration: 227
 ongoing: true
 participants: Array(1)
 0: {user_id: "90be3fef-1be9-44c3-9962-7f1169846c57", user_name: "Abeba NGWE", join_time: 1586545796, duration: 227}
 length: 1
 __proto__: Array(0)
 */

