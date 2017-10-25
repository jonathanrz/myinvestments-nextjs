import React from 'react'
import Layout from '../components/MyLayout.js'
import Router from 'next/router'

class Index extends React.Component {
  render () {
    return (
      <Layout
        title={'Novo Recebimento'}
        detail={true}
        onNavigationClose={() => {
          Router.goBack()
        }}
      >
        Novo Recebimento
      </Layout>
    )
  }
}

export default Index
