import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const pageStyle = {
  margin: 20
}

class Layout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    detail: PropTypes.bool.isRequired,
    onNavigationClose: PropTypes.func,
    children: PropTypes.element.isRequired,
    rightElements: PropTypes.func
  }

  render () {
    const { detail, title, children, onNavigationClose, rightElements } = this.props

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
            iconElementRight={rightElements ? rightElements() : <div />}
          />
        ) : (
          <AppBar title={title} iconClassNameRight="muidocs-icon-navigation-expand-more" />
        )}

        <div style={pageStyle}>{children}</div>
      </MuiThemeProvider>
    )
  }
}

export default Layout
