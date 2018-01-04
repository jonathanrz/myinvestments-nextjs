import moment from 'moment'
import { incomeGain } from '../../../lib/income'

const getTotalBought = state => {
  const investments = state.data.filteredInvestments
  const data = []
  let totalBought = 0
  let totalGain = 0
  let maxMonths = 0

  investments.forEach(investment => {
    let total = {
      name: investment.name,
      holder: investment.holder,
      months: investment.incomes.length || 0,
      bought: 0,
      gain: 0
    }
    let lastIncomeValue = 0
    investment.incomes.sort((left, right) => moment.utc(left.date).diff(moment.utc(right.date))).forEach(income => {
      total.bought += income.bought || 0
      total.gain += incomeGain(income) - lastIncomeValue
      lastIncomeValue = income.value
    })
    totalBought += total.bought
    totalGain += total.gain
    if (total.months > maxMonths) {
      maxMonths = total.months
    }

    data.push(total)
  })

  return { data: data, totalBought: totalBought, totalGain: totalGain, maxMonths: maxMonths }
}

export default getTotalBought
