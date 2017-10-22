import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Layout from '../components/MyLayout.js'
import { getInvestment, getToken } from '../components/Api'

class Index extends React.Component {
  static async getInitialProps ({ query, req }) {
    const res = await getInvestment(getToken(req), query.id)
    const data = res.data

    return {
      investment: data
    }
  }

  render () {
    const { investment } = this.props

    return (
      <Layout
        title={investment.name}
        detail={true}
        onNavigationClose={() => {
          Router.push('/')
        }}
      />
    )
  }
}

Index.propTypes = {
  investment: PropTypes.element.isRequired
}

export default Index
