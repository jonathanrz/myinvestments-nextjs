import getTotalBought from '../totalBought'
import { investments } from '../../../../fixtures/investments'

describe('total bought selector', () => {
  it('returns data of total bought', () => {
    const dataState = {
      filteredInvestments: { investments }
    }
    const state = { data: dataState }
    const { data, maxMonths, totalBought, totalGain } = getTotalBought(state)
    expect(data[0]).toEqual({ bought: 1000, gain: 20, holder: 'Holder', months: 2, name: 'Test' })
    expect(data[1]).toEqual({ bought: 0, gain: 1550, holder: 'broker', months: 1, name: 'HGTX3' })
    expect(maxMonths).toEqual(2)
    expect(totalBought).toEqual(1000)
    expect(totalGain).toEqual(1570)
  })
})
