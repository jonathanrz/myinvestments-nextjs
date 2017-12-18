import { mount } from 'enzyme'
import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InvestmentsTable from '../investmentsTable'

const data = [{ bought: 1000, gain: 20, holder: 'Holder', months: 2, name: 'Test' }, { bought: 500, gain: 1050, holder: 'broker', months: 1, name: 'HGTX3' }]

const buildWrapper = () => {
  return mount(
    <MuiThemeProvider>
      <InvestmentsTable data={data} maxMonths={2} totalBought={1500} totalGain={1070} />
    </MuiThemeProvider>
  )
}

const validateRow = (row, columns) => {
  columns.forEach((column, index) => {
    expect(row.at(index)).toHaveText(column)
  })
}

describe('InvestmentsTable', () => {
  test('snapshots', () => {
    const wrapper = buildWrapper()
    const firstRow = wrapper
      .find(TableRow)
      .at(1)
      .find(TableRowColumn)
    validateRow(firstRow, ['Test', 'Holder', '2', 'R$ 1.000,00', 'R$ 20,00', '2.00%', '1.00%'])
    const secondRow = wrapper
      .find(TableRow)
      .at(2)
      .find(TableRowColumn)
    validateRow(secondRow, ['HGTX3', 'broker', '1', 'R$ 500,00', 'R$ 1.050,00', '210.00%', '210.00%'])

    const totalRow = wrapper
      .find(TableRow)
      .at(3)
      .find(TableRowColumn)
    validateRow(totalRow, ['Total', '', '2', 'R$ 1.500,00', 'R$ 1.070,00', '71.33%', '35.67%'])
  })
})
