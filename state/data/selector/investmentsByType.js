const getInvestmentCurrentValue = investment => {
  if (investment.incomes && investment.incomes.length > 0) return investment.incomes[0].value
  return 0
}

const getInvestmentsByType = state => {
  const investments = state.data.filteredInvestments
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
    investmentsByType[investmentType].value += getInvestmentCurrentValue(investment)
  }

  const totalValue = investments.reduce((acum, investment) => acum + getInvestmentCurrentValue(investment), 0)

  investmentsByType['Total'] = {}
  investmentsByType['Total'].investments = investments
  investmentsByType['Total'].value = totalValue

  return investmentsByType
}

export default getInvestmentsByType
