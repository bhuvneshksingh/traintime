import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

import Fab from '@material-ui/core/Fab'

class AccountBanner extends Component {
  openRegisterPage = () => {
    this.props.history.push('/registration', {})
  }

  render() {
    return (
      <div
        className="account-banner-container"
        style={{
          backgroundImage: `url(${this.props.photo_url})`,
        }}>
        <div className="account-banner">
          <div className="account-banner-text">
            <h3>{this.props.title}</h3>
            <p>{this.props.subtitle}</p>
          </div>

          <Fab
            className="banner-button"
            variant="extended"
            color="primary"
            aria-label="Add"
            onClick={this.openRegisterPage}>
            <span>{this.props.button_text}</span>
          </Fab>
        </div>
      </div>
    )
  }
}

export default withRouter(AccountBanner)
