import React from 'react'
import Layout from '../components/MyLayout.js'
import Router from 'next/router'
import { setToken } from '../components/Api'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = { token: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ token: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    setToken(this.state.token)
    Router.push('/')
  }

  render () {
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <label>
            Token:
            <input
              type="text"
              name="token"
              value={this.state.token}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Layout>
    )
  }
}

export default Index
