import moment from 'moment'

export const incomeGain = income => {
  return income.value - (income.bought || 0) + (income.sold || 0) - (income.fee || 0) - (income.ir || 0) + (income.gross || 0)
}

export const hasGrossIROrFee = income => {
  return income.fee || income.ir || income.gross
}

export const calculateIncomesGains = incomes => {
  var lastIncomeValue = 0
  const newIncomes = incomes
    .sort((left, right) => moment.utc(left.date).diff(moment.utc(right.date)))
    .map(item => {
      if (lastIncomeValue === 0) {
        item.gain = incomeGain(item)
        item.gainInPerc = item.gain / item.value
      } else {
        item.gain = incomeGain(item) - lastIncomeValue
        item.gainInPerc = item.gain / lastIncomeValue
      }
      lastIncomeValue = item.value
      return item
    })
    .reverse()
  return newIncomes
}
