import getInvestmentsByType from './investmentsByType'
import { investments } from '../../../fixtures/investments'

describe('investments by type selector', () => {
  it('returns investments grouped by type', () => {
    const dataState = {
      filteredInvestments: { investments }
    }
    const state = { data: dataState }
    const investmentsByType = getInvestmentsByType(state)
    expect(Object.keys(investmentsByType)).toEqual(['CDB', 'monetary action', 'Total'])

    const cdb = investmentsByType['CDB']
    expect(cdb.value).toEqual(1000)
    expect(cdb.investments.length).toEqual(1)

    const cdbIncomes = cdb.investments[0].incomes
    expect(cdbIncomes.length).toEqual(2)

    expect(cdbIncomes[0].date).toEqual('2017-11-01T00:00:00.000Z')
    expect(cdbIncomes[1].date).toEqual('2017-12-01T00:00:00.000Z')

    const monetaryAction = investmentsByType['monetary action']
    expect(monetaryAction.value).toEqual(1550)

    const total = investmentsByType['Total']
    expect(total.value).toEqual(2550)
    expect(total.investments.length).toEqual(2)
    expect(total.investments[0].type).toEqual('CDB')
    expect(total.investments[1].type).toEqual('monetary action')
  })
})
