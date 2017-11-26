import { combineReducers } from 'redux'
import filter, { initialState as filterState } from './filter/reducer'
import data, { initialState as dataState } from './data/reducer'

export const initialState = { filter: filterState, data: dataState }

export default combineReducers({ filter, data })
