import React from 'react'
import Layout from '../components/MyLayout.js'
import PropTypes from 'prop-types'
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
      <Layout>
        <div>{investment.name}</div>
      </Layout>
    )
  }
}

Index.propTypes = {
  investment: PropTypes.element.isRequired
}

export default Index
