import { SET_INVESTMENT_HOLDER, SET_INVESTMENT_TYPE, SET_YEAR } from './actions'

export const initialState = {
  investmentHolder: 'all',
  investmentType: 'all',
  year: 2017
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVESTMENT_HOLDER:
      return { ...state, investmentHolder: action.data }
    case SET_INVESTMENT_TYPE:
      return { ...state, investmentType: action.data }
    case SET_YEAR:
      return { ...state, year: action.data }
    default:
      return state
  }
}

export default reducer
