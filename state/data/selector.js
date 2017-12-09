const getInvestmentsByType = state => {
  const investments = state.data.filteredInvestments.investments
  var investmentsByType = {}

  for (let i = 0; i < investments.length; i++) {
    const investment = investments[i]

    var investmentType = investment.type
    if (!investmentsByType[investmentType]) {
      investmentsByType[investmentType] = {}
      investmentsByType[investmentType].investments = []
      investmentsByType[investmentType].value = 0
    }
    investmentsByType[investmentType].investments.push(investment)
    investmentsByType[investmentType].value += investment.currentValue
  }

  const totalValue = investments.reduce((acum, investment) => acum + investment.currentValue, 0)

  investmentsByType['Total'] = {}
  investmentsByType['Total'].investments = investments
  investmentsByType['Total'].value = totalValue

  return investmentsByType
}

export { getInvestmentsByType }
