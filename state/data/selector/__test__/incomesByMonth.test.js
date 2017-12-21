import getIncomesByMonth from '../incomesByMonth'
import { investments } from '../../../../fixtures/investments'

describe('incomes by month selector', () => {
  it('returns data of incomes by month', () => {
    const dataState = {
      filteredInvestments: { investments }
    }
    const state = { data: dataState }

    const { totalValue, investmentsByMonth, grossIrAndFees } = getIncomesByMonth(state)
    expect(investmentsByMonth).toHaveLength(2)

    const decemberData = investmentsByMonth[0]
    expect(decemberData.month).toEqual('2017-12-01T00:00:00.000Z')
    expect(decemberData.investments).toEqual({
      '5a17579f15c4da021g21a43a': { perc: 1.064516129032258, value: 1650 },
      '5b0cdf5bc15e16201f282eb9': { perc: 0.02, value: 20 },
      Total: { perc: 0.537258064516129, value: 1670 }
    })

    const novemberData = investmentsByMonth[1]
    expect(novemberData.month).toEqual('2017-11-01T00:00:00.000Z')
    expect(novemberData.investments).toEqual({
      '5a17579f15c4da021g21a43a': { perc: 0, value: 0 },
      '5b0cdf5bc15e16201f282eb9': { perc: 0, value: 0 },
      Total: { perc: 0, value: 0 }
    })

    expect(totalValue).toEqual(2570)
    expect(grossIrAndFees).toEqual([{ date: '2017-12-01T00:00:00.000Z', fee: 0, gross: 100, holder: 'broker', investment: 'HGTX3', ir: 0, value: 1550 }])
  })
})
