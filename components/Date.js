import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
import PropTypes from 'prop-types'

export const Month = ({ date }) => (
  <Moment format="MM/YY" tz="UTC">
    {date}
  </Moment>
)

Month.propTypes = {
  date: PropTypes.string.isRequired
}

const Date = ({ date }) => (
  <Moment format="DD/MM/YY" tz="UTC">
    {date}
  </Moment>
)

Date.propTypes = {
  date: PropTypes.string.isRequired
}

export default Date
