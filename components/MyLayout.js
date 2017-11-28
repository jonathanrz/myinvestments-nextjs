import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import MenuItem from 'material-ui/MenuItem'
import SettingsInputSvideo from 'material-ui/svg-icons/action/settings-input-svideo'
import CardTravel from 'material-ui/svg-icons/action/card-travel'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class Layout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onDrawerItemClicked: PropTypes.func,
    detail: PropTypes.bool,
    children: PropTypes.element,
    onNavigationClose: PropTypes.func,
    rightElements: PropTypes.func
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.handleMenuToggle = this.handleMenuToggle.bind(this)

    this.state = {
      drawerOpen: false
    }
  }

  handleMenuToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen })

  render () {
    const { detail, title, children, onNavigationClose, rightElements } = this.props
    const { drawerOpen } = this.state

    const drawerWidth = detail || !drawerOpen ? 0 : 200
    const pageStyle = {
      marginLeft: drawerWidth - 8,
      marginTop: -8,
      marginRight: -8
    }
    const contentStyle = {
      margin: 20
    }

    return (
      <MuiThemeProvider>
        <div style={pageStyle}>
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
            <div>
              <Drawer width={drawerWidth} open={this.state.drawerOpen}>
                <AppBar iconElementLeft={<IconButton />} />
                <MenuItem primaryText="Dashboard" leftIcon={<SettingsInputSvideo />} onClick={() => this.props.onDrawerItemClicked('Dashboard')} />
                <MenuItem primaryText="Investimentos" leftIcon={<CardTravel />} onClick={() => this.props.onDrawerItemClicked('Investimentos')} />
              </Drawer>
              <AppBar title={title} onLeftIconButtonTouchTap={this.handleMenuToggle} />
            </div>
          )}
          <div style={contentStyle}>{children}</div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Layout
