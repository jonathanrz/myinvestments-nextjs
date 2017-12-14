import { mount } from 'enzyme'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TotalByType } from '../index'
import { investmentsByType } from '../../../../fixtures/investments'

const buildWrapper = () => {
  return mount(
    <MuiThemeProvider>
      <TotalByType investmentsByType={investmentsByType} />
    </MuiThemeProvider>
  )
}

describe('TotalByType', () => {
  it('render equal last time', () => {
    const wrapper = buildWrapper()
    expect(wrapper).toMatchSnapshot()
  })
})
