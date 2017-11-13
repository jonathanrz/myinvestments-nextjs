import React from 'react'
import PropTypes from 'prop-types'
import { green800 as greenColor, red800 as redColor, grey900 as grey } from 'material-ui/styles/colors'
import { formatPercent } from '../lib/number'

export const PercentWithColor = ({ percent }) => (
  <div
    style={{
      color: percent > 0 ? greenColor : percent < 0 ? redColor : grey
    }}
  >
    {formatPercent(percent, 2)}
  </div>
)

PercentWithColor.propTypes = {
  percent: PropTypes.number.isRequired
}
