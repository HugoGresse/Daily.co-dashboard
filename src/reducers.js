import { combineReducers } from 'redux'
import dailyCoReducer from './data/dailyCoReducer'

export const rootReducer = combineReducers({
  dailyCo: dailyCoReducer,
})
