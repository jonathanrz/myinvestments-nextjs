import React from 'react'
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PropTypes from 'prop-types'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const pageStyle = {
  margin: 20
}

const Layout = props => (
  <MuiThemeProvider>
    <div style={layoutStyle}>
      <Header />
      <div style={pageStyle}>{props.children}</div>
    </div>
  </MuiThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.element.isRequired
}

export default Layout
