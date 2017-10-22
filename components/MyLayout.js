import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import PropTypes from 'prop-types'

const pageStyle = {
  margin: 20
}

const Layout = props => (
  <MuiThemeProvider>
    <AppBar
      title={props.title}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <div style={pageStyle}>{props.children}</div>
  </MuiThemeProvider>
)

Layout.propTypes = {
  title: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired
}

export default Layout
