import { shallow } from 'enzyme'
import React from 'react'
import { TotalByType } from './index'
import { investmentsByType } from '../../../fixtures/investments'

const buildWrapper = () => {
  return shallow(<TotalByType investmentsByType={investmentsByType} />)
}

describe('TotalByType', () => {
  it('render equal last time', () => {
    const wrapper = buildWrapper()
    let tree = wrapper.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
