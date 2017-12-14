import { mount } from 'enzyme'
import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InvestmentsTable from './investmentsTable'

const investmentsByType = {
  CDB: { value: 10 },
  MonetaryAction: { value: 40 },
  Total: { value: 50 }
}

const buildWrapper = () => {
  return mount(
    <MuiThemeProvider>
      <InvestmentsTable investmentsByType={investmentsByType} totalValue={50} />
    </MuiThemeProvider>
  )
}

describe('InvestmentsTable', () => {
  test('snapshots', () => {
    const wrapper = buildWrapper()
    const cdbRow = wrapper
      .find(TableRow)
      .at(1)
      .find(TableRowColumn)
    expect(cdbRow.at(0)).toHaveText('CDB')
    expect(cdbRow.at(1)).toHaveText('R$ 10,00')
    expect(cdbRow.at(2)).toHaveText('20.00%')
    const monetaryActionRow = wrapper
      .find(TableRow)
      .at(2)
      .find(TableRowColumn)
    expect(monetaryActionRow.at(0)).toHaveText('MonetaryAction')
    expect(monetaryActionRow.at(1)).toHaveText('R$ 40,00')
    expect(monetaryActionRow.at(2)).toHaveText('80.00%')
    const totalRow = wrapper
      .find(TableRow)
      .at(3)
      .find(TableRowColumn)
    expect(totalRow.at(0)).toHaveText('Total')
    expect(totalRow.at(1)).toHaveText('R$ 50,00')
    expect(totalRow.at(2)).toHaveText('100.00%')
  })
})
