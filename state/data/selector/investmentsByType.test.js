import getInvestmentsByType from './investmentsByType'

const investments = [
  {
    _id: '5b0cdf5bc15e16201f282eb9',
    holder: 'Holder',
    type: 'CDB',
    name: 'Test',
    incomes: [
      {
        _id: '5a17590153c4ca001f21f43d',
        fee: 0,
        ir: 0,
        gross: 0,
        bought: 0,
        value: 1020,
        quantity: 1,
        date: '2017-12-01T00:00:00.000Z',
        investment: '5b0cdf5bc15e16201f282eb9'
      },
      {
        _id: '5a1cda7bb15b16001f282eba',
        fee: 0,
        ir: 0,
        gross: 0,
        bought: 1000,
        value: 1000,
        quantity: 1,
        date: '2017-11-01T00:00:00.000Z',
        investment: '5b0cdf5bc15e16201f282eb9'
      }
    ]
  },
  {
    _id: '5a17579f15c4da021g21a43a',
    holder: 'broker',
    type: 'monetary action',
    name: 'HGTX3',
    incomes: [
      {
        _id: '5a1757g125c4ad001f21f43c',
        fee: 0,
        ir: 0,
        gross: 0,
        bought: 0,
        value: 1550,
        quantity: 100,
        date: '2017-12-01T00:00:00.000Z',
        investment: '5a17579f15c4da021g21a43a'
      }
    ]
  }
]

describe('investments by type selector', () => {
  it('returns investments grouped by type', () => {
    const dataState = {
      filteredInvestments: { investments }
    }
    const state = { data: dataState }
    const investmentsByType = getInvestmentsByType(state)
    expect(Object.keys(investmentsByType)).toEqual(['CDB', 'monetary action', 'Total'])

    const cdb = investmentsByType['CDB']
    expect(cdb.value).toEqual(1020)
    expect(cdb.investments.length).toEqual(1)

    const cdbIncomes = cdb.investments[0].incomes
    expect(cdbIncomes.length).toEqual(2)

    expect(cdbIncomes[0].date).toEqual('2017-12-01T00:00:00.000Z')
    expect(cdbIncomes[1].date).toEqual('2017-11-01T00:00:00.000Z')

    const monetaryAction = investmentsByType['monetary action']
    expect(monetaryAction.value).toEqual(1550)

    const total = investmentsByType['Total']
    expect(total.value).toEqual(2570)
    expect(total.investments.length).toEqual(2)
    expect(total.investments[0].type).toEqual('CDB')
    expect(total.investments[1].type).toEqual('monetary action')
  })
})
