import { SET_INVESTMENTS, SET_FILTERED_INVESTMENTS } from './actions'

export const initialState = {
  investments: [],
  filteredInvestments: { investments: [], byType: [] }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVESTMENTS:
      return { ...state, investments: action.data }
    case SET_FILTERED_INVESTMENTS:
      return { ...state, filteredInvestments: action.data }
    default:
      return state
  }
}

export default reducer
