import React from 'react'
import PropTypes from 'prop-types'
import { green800 as greenColor, red800 as redColor, grey900 as grey } from 'material-ui/styles/colors'
import { formatMoney } from '../utils/number'

export const Money = ({ value }) => <div>{formatMoney(value, 2)}</div>

Money.propTypes = {
  value: PropTypes.number.isRequired
}

export const MoneyWithColor = ({ value }) => (
  <div
    style={{
      color: value > 0 ? greenColor : value < 0 ? redColor : grey
    }}
  >
    {formatMoney(value, 2)}
  </div>
)

MoneyWithColor.propTypes = {
  value: PropTypes.number.isRequired
}
