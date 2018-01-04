import { shallow } from 'enzyme'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui/Table'
import { Month } from '../../../../components/Date'
import { MoneyWithColor } from '../../../../components/Money'
import { PercentWithColor } from '../../../../components/Percent'

import MonthTable from '../monthTable'

const investments = [{ _id: '1' }, { _id: '2' }]
const investmentsByMonth = [
  { month: '2017-12-01T00:00:00.000Z', investments: { '1': { value: 20, perc: 0.1 }, '2': { value: 0, perc: 0 }, Total: { value: 20, perc: 0.5 } } },
  { month: '2017-11-01T00:00:00.000Z', investments: { '1': { value: 25, perc: 0.12 }, '2': { value: 50, perc: 0.25 }, Total: { value: 75, perc: 0.6 } } }
]

const buildWrapper = showValues => {
  return shallow(
    <MuiThemeProvider>
      <MonthTable investments={investments} investmentsByMonth={investmentsByMonth} showValues={showValues} />
    </MuiThemeProvider>
  ).dive()
}

const extractHeader = wrapper => {
  return wrapper
    .find(TableRow)
    .at(0)
    .find(TableHeaderColumn)
}

const extractRow = (wrapper, index) => {
  return wrapper
    .find(TableRow)
    .at(index)
    .find(TableRowColumn)
}

describe('InvestmentsTable', () => {
  test('show headers correctly', () => {
    const wrapper = buildWrapper(true)
    const header = extractHeader(wrapper)
    expect(header.at(0).find(Month)).toHaveProp('date', '2017-12-01T00:00:00.000Z')
    expect(header.at(1).find(Month)).toHaveProp('date', '2017-11-01T00:00:00.000Z')
  })

  test('show values correctly', () => {
    const wrapper = buildWrapper(true)

    const firstRow = extractRow(wrapper, 1)
    expect(firstRow.at(0).find(MoneyWithColor)).toHaveProp('value', 20)
    expect(firstRow.at(1).find(MoneyWithColor)).toHaveProp('value', 25)

    const secondRow = extractRow(wrapper, 2)
    expect(secondRow.at(0).find(MoneyWithColor)).toHaveProp('value', 0)
    expect(secondRow.at(1).find(MoneyWithColor)).toHaveProp('value', 50)

    const totalRow = extractRow(wrapper, 3)
    expect(totalRow.at(0).find(MoneyWithColor)).toHaveProp('value', 20)
    expect(totalRow.at(1).find(MoneyWithColor)).toHaveProp('value', 75)
  })

  test('show percents correctly', () => {
    const wrapper = buildWrapper(false)
    const firstRow = extractRow(wrapper, 1)
    expect(firstRow.at(0).find(PercentWithColor)).toHaveProp('percent', 0.1)
    expect(firstRow.at(1).find(PercentWithColor)).toHaveProp('percent', 0.12)

    const secondRow = extractRow(wrapper, 2)
    expect(secondRow.at(0).find(PercentWithColor)).toHaveProp('percent', 0)
    expect(secondRow.at(1).find(PercentWithColor)).toHaveProp('percent', 0.25)

    const totalRow = extractRow(wrapper, 3)
    expect(totalRow.at(0).find(PercentWithColor)).toHaveProp('percent', 0.5)
    expect(totalRow.at(1).find(PercentWithColor)).toHaveProp('percent', 0.6)
  })
})
