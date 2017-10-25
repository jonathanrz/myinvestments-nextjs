import React from 'react'
import PropTypes from 'prop-types'
import {
  green800 as greenColor,
  red800 as redColor
} from 'material-ui/styles/colors'
import { formatMoney } from '../utils/number'

export const Money = ({ value }) => <div>{formatMoney(value, 2)}</div>

Money.propTypes = {
  value: PropTypes.number.isRequired
}

export const MoneyWithColor = ({ value }) => (
  <div
    style={{
      color: value >= 0 ? greenColor : redColor
    }}
  >
    {formatMoney(value, 2)}
  </div>
)

MoneyWithColor.propTypes = {
  value: PropTypes.number.isRequired
}
