import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import PropTypes from 'prop-types'

const pageStyle = {
  margin: 20
}

class Layout extends React.Component {
  render () {
    const { detail, title, children, onNavigationClose } = this.props

    return (
      <MuiThemeProvider>
        {detail ? (
          <AppBar
            title={title}
            iconElementLeft={
              <IconButton>
                <NavigationClose />
              </IconButton>
            }
            onLeftIconButtonTouchTap={onNavigationClose}
          />
        ) : (
          <AppBar
            title={title}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        )}

        <div style={pageStyle}>{children}</div>
      </MuiThemeProvider>
    )
  }
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.bool.isRequired,
  onNavigationClose: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default Layout
