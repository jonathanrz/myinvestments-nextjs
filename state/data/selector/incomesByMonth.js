import { hasGrossIROrFee, calculateIncomesGains } from '../../../lib/income'
import moment from 'moment'

const totalId = 'Total'

const getIncomesByMonth = state => {
  const investments = [...state.data.filteredInvestments.investments]

  const investmentsByMonth = {}
  const grossIrAndFees = []
  var totalValue = 0

  investments.forEach(investment => {
    const incomesGains = calculateIncomesGains(investment.filteredIncomes)
    incomesGains.forEach(income => {
      const monthData = investmentsByMonth[income.date] || {}
      const investmentData = monthData[investment._id] || {}

      investmentData.value = income.gain
      investmentData.perc = income.gainInPerc

      const totalData = monthData[totalId] || { value: 0, perc: 0 }

      totalData.value += income.gain
      totalData.perc += income.gainInPerc
      totalData.perc /= 2

      monthData[investment._id] = investmentData
      monthData[totalId] = totalData
      investmentsByMonth[income.date] = monthData

      if (hasGrossIROrFee(income)) {
        grossIrAndFees.push({
          investment: investment.name,
          holder: investment.holder,
          date: income.date,
          value: income.value,
          gross: income.gross,
          ir: income.ir,
          fee: income.fee
        })
      }
    })

    investment.currentValue = incomesGains.length > 0 ? incomesGains[0].value : 0

    totalValue += investment.currentValue
  })

  Object.keys(investmentsByMonth).map(month => {
    investments.forEach(investment => {
      if (!investmentsByMonth[month][investment._id]) {
        investmentsByMonth[month][investment._id] = { value: 0, perc: 0 }
      }
    })
  })

  const investmentsByMonthArray = []

  Object.keys(investmentsByMonth).map(month => {
    investmentsByMonthArray.push({
      month: month,
      investments: investmentsByMonth[month]
    })
  })

  return {
    totalValue: totalValue,
    investments: investments,
    investmentsByMonth: investmentsByMonthArray,
    grossIrAndFees: grossIrAndFees.sort((left, right) => moment.utc(left.date).diff(moment.utc(right.date)))
  }
}

export default getIncomesByMonth
