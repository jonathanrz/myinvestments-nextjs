import React from 'react'
import PropTypes from 'prop-types'
import {
  green800 as greenColor,
  red800 as redColor
} from 'material-ui/styles/colors'
import { formatPercent } from '../utils/number'

export const PercentWithColor = ({ percent }) => (
  <div
    style={{
      color: percent >= 0 ? greenColor : redColor
    }}
  >
    {formatPercent(percent, 2)}
  </div>
)

PercentWithColor.propTypes = {
  percent: PropTypes.number.isRequired
}
