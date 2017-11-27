import React from 'react'
import withRedux from 'next-redux-wrapper'

import initStore from '../state'
import Dashboard from '../components/dashboard'

class Index extends React.Component {
  render () {
    return <Dashboard />
  }
}

export default withRedux(initStore, null, null)(Index)
