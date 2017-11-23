import { combineReducers } from 'redux'
import filter, { initialState as filterState } from './filter/reducer'

export const initialState = { filter: filterState }

export default combineReducers({ filter })
