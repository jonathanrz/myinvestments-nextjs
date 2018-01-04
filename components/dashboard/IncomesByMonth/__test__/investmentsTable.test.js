import { shallow } from 'enzyme'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import InvestmentsTable from '../investmentsTable'
import { Money } from '../../../../components/Money'
import { PercentWithColor } from '../../../../components/Percent'

const investments = [{ _id: 1, name: 'Test', currentValue: 1020 }, { _id: 2, name: 'HGTX3', currentValue: 1550.25 }]

const buildWrapper = showValues => {
  return shallow(
    <MuiThemeProvider>
      <InvestmentsTable investments={investments} showValues={showValues} totalValue={2570.25} />
    </MuiThemeProvider>
  ).dive()
}

const extractRow = (wrapper, index) => {
  return wrapper
    .find(TableRow)
    .at(index)
    .find(TableRowColumn)
}

describe('InvestmentsTable', () => {
  test('show values correctly', () => {
    const wrapper = buildWrapper(true)
    const firstRow = extractRow(wrapper, 1)
    expect(firstRow.at(0)).toHaveProp('children', 'Test')
    expect(firstRow.at(1).find(Money)).toHaveProp('value', 1020)

    const secondRow = extractRow(wrapper, 2)
    expect(secondRow.at(0)).toHaveProp('children', 'HGTX3')
    expect(secondRow.at(1).find(Money)).toHaveProp('value', 1550.25)

    const totalRow = extractRow(wrapper, 3)
    expect(totalRow.at(0)).toHaveProp('children', 'Total')
    expect(totalRow.at(1).find(Money)).toHaveProp('value', 2570.25)
  })

  test('show percents correctly', () => {
    const wrapper = buildWrapper(false)
    const firstRow = extractRow(wrapper, 1)
    expect(firstRow.at(0)).toHaveProp('children', 'Test')
    expect(firstRow.at(1).find(PercentWithColor)).toHaveProp('percent', 0.3968485555879778)

    const secondRow = extractRow(wrapper, 2)
    expect(secondRow.at(0)).toHaveProp('children', 'HGTX3')
    expect(secondRow.at(1).find(PercentWithColor)).toHaveProp('percent', 0.6031514444120222)

    const totalRow = extractRow(wrapper, 3)
    expect(totalRow.at(0)).toHaveProp('children', 'Total')
    expect(totalRow.at(1).find(PercentWithColor)).toHaveProp('percent', 1)
  })
})
