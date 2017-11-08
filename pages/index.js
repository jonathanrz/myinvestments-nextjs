import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/MyLayout.js'

class Index extends React.Component {
  render () {
    return <Layout title="Dashboard" />
  }
}

Index.propTypes = {
  investments: PropTypes.element.isRequired
}

export default Index
