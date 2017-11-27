import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import initStore from '../state'
import { setInvestments } from '../state/data/actions'
import Dashboard from '../components/dashboard'
import Layout from '../components/MyLayout'
import Investments from '../components/Investments'

import { getInvestmentsWithIncomes, getToken } from '../components/Api'

const compareHolder = (left, right) => left.holder.localeCompare(right.holder)

class Index extends React.Component {
  static propTypes = {
    setInvestments: PropTypes.func.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.state = { currentItem: 'Dashboard' }
  }

  componentWillMount () {
    getInvestmentsWithIncomes(getToken()).then(response => {
      const investments = response.data
      investments.sort(compareHolder)
      this.props.setInvestments(investments)
    })
  }

  onDrawerItemClicked = item => {
    this.setState({ currentItem: item })
  }

  render () {
    const { currentItem } = this.state

    return (
      <Layout title={currentItem} onDrawerItemClicked={this.onDrawerItemClicked}>
        {currentItem === 'Dashboard' && <Dashboard />}
        {currentItem === 'Investimentos' && <Investments />}
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setInvestments: bindActionCreators(setInvestments, dispatch)
})

export default withRedux(initStore, null, mapDispatchToProps)(Index)
