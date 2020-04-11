import { applyMiddleware, compose, createStore } from 'redux'
import {rootReducer} from './reducers'
import thunk from 'redux-thunk'

export const configureStore = () => {
    const middleware = [thunk]
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middleware))
    )

    return store
}
