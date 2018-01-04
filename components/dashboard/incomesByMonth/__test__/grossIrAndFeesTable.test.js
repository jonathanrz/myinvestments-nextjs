import { shallow } from 'enzyme'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import GrossIrAndFeesTable from '../grossIrAndFeesTable'

import { Month } from '../../../../components/Date'
import { Money, MoneyWithColor, MoneyWithInvertedColor } from '../../../../components/Money'

const data = [{ _id: 1, investment: 'Investment', holder: 'Holder', date: '2017-12-01T00:00:00.000Z', value: 10, gross: 2, ir: 1, fee: 1.5 }]

const buildWrapper = showValues => {
  return shallow(
    <MuiThemeProvider>
      <GrossIrAndFeesTable grossIrAndFees={data} />
    </MuiThemeProvider>
  ).dive()
}

const extractRow = (wrapper, index) => {
  return wrapper
    .find(TableRow)
    .at(index)
    .find(TableRowColumn)
}

describe('GrossIrAndFeesTable', () => {
  test('show values correctly', () => {
    const wrapper = buildWrapper(true)
    const firstRow = extractRow(wrapper, 1)
    expect(firstRow.at(0)).toHaveProp('children', 'Investment')
    expect(firstRow.at(1)).toHaveProp('children', 'Holder')
    expect(firstRow.at(2).find(Month)).toHaveProp('date', '2017-12-01T00:00:00.000Z')
    expect(firstRow.at(3).find(Money)).toHaveProp('value', 10)
    expect(firstRow.at(4).find(MoneyWithColor)).toHaveProp('value', 2)
    expect(firstRow.at(5).find(MoneyWithInvertedColor)).toHaveProp('value', 1)
    expect(firstRow.at(6).find(MoneyWithInvertedColor)).toHaveProp('value', 1.5)
  })
})
