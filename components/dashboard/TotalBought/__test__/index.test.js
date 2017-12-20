import { mount } from 'enzyme'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TotalBought } from '../index'
import { totalBoughtData } from '../../../../fixtures/investments'

const buildWrapper = () => {
  return mount(
    <MuiThemeProvider>
      <TotalBought totalBoughtData={totalBoughtData} />
    </MuiThemeProvider>
  )
}

describe('TotalBought', () => {
  it('render equal last time', () => {
    const wrapper = buildWrapper()
    expect(wrapper).toMatchSnapshot()
  })
})
