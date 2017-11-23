import { SET_INVESTMENT_TYPE } from './actions'

export const initialState = {
  investmentType: 'all'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVESTMENT_TYPE:
      return { ...state, investmentType: action.data }
    default:
      return state
  }
}

export default reducer
