import React from 'react'
import withRedux from 'next-redux-wrapper'

import initStore from '../state'
import Dashboard from '../components/dashboard'
import Layout from '../components/MyLayout'
import Investments from '../components/Investments'

class Index extends React.Component {
  constructor (ctx, props) {
    super(ctx, props)

    this.state = { currentItem: 'Dashboard' }
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

export default withRedux(initStore, null, null)(Index)
