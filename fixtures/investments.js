import { getInvestmentsByType, getTotalBought } from '../state/data/selector'

const cdbIncomes = [
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

const monetaryActionIncomes = [
  {
    _id: '5a1757g125c4ad001f21f43c',
    fee: 0,
    ir: 0,
    gross: 100,
    bought: 0,
    value: 1550,
    quantity: 100,
    date: '2017-12-01T00:00:00.000Z',
    investment: '5a17579f15c4da021g21a43a'
  }
]

export const investments = [
  {
    _id: '5b0cdf5bc15e16201f282eb9',
    holder: 'Holder',
    type: 'CDB',
    name: 'Test',
    incomes: cdbIncomes,
    filteredIncomes: cdbIncomes
  },
  {
    _id: '5a17579f15c4da021g21a43a',
    holder: 'broker',
    type: 'monetary action',
    name: 'HGTX3',
    incomes: monetaryActionIncomes,
    filteredIncomes: monetaryActionIncomes
  }
]

const dataState = {
  filteredInvestments: { investments }
}
const state = { data: dataState }

export const totalBoughtData = getTotalBought(state)
export const investmentsByType = getInvestmentsByType(state)
