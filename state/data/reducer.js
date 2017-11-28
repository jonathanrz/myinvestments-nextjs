import { SET_INVESTMENTS, SET_FILTERED_INVESTMENTS } from './actions'

export const initialState = {
  investments: [],
  types: {},
  holders: {},
  filteredInvestments: { investments: [], byType: {} }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVESTMENTS: {
      const investments = action.data

      var types = {}
      var holders = {}

      investments.forEach(investment => {
        types[investment.type] = null
        holders[investment.holder] = null
      })

      return { ...state, investments, types, holders }
    }
    case SET_FILTERED_INVESTMENTS:
      return { ...state, filteredInvestments: action.data }
    default:
      return state
  }
}

export default reducer
