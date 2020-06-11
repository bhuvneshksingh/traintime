import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import LanguageIcon from '@material-ui/icons/LanguageOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { withTranslation } from 'react-i18next'

import { setSystemLocale } from '../../store/actions/system'

class LanguageSwitcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuItemClick = locale => {
    const { setSystemLocale, i18n } = this.props

    this.setState({ anchorEl: null })

    setSystemLocale(locale)
    i18n.changeLanguage(locale.value)
  }

  render() {
    const anchorEl = this.state.anchorEl
    const {
      system: { locales },
    } = this.props

    return (
      <div className="language-switcher">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}>
          <LanguageIcon />
          <span>Language</span>
        </Button>

        <Menu
          id="simple-menu"
          className="languages-dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={this.handleMenuItemClick}>
          {locales.map(locale => (
            <MenuItem
              key={locale.id}
              className="languages-dropdown-menu__item"
              onClick={() => this.handleMenuItemClick(locale)}>
              <img src={locale.src} alt={locale.name} />
              <span>{locale.name}</span>
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return { system: store.system }
}

const mapDispatchToProps = dispatch => ({
  setSystemLocale: locale => dispatch(setSystemLocale(locale)),
})

const LanguageSwitcherRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSwitcher)

export default withTranslation()(LanguageSwitcherRedux)
