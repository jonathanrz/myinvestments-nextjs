import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducer, { initialState } from './reducer'

const logger = createLogger()
const initStore = (state = initialState) => createStore(reducer, state, applyMiddleware(logger))

export default initStore
