import React, { Component } from 'react'
import MailIcon from '../../assets/mail.svg'
import Button from '@material-ui/core/Button'

export default class ConfirmationScreen extends Component {
  openHomePage = () => {
    this.props.history.push('/', {})
  }

  render() {
    return (
      <div className="confirmation-page">
        <div className="confirmation-dialog-container">
          <div className="message-container">
            <img src={MailIcon} alt="" />
            <div>
              <h3>Please confirm registration </h3>
              <p>We have sent confirmation email to your email address</p>
            </div>
          </div>
          <Button
            onClick={this.openHomePage}
            color="primary"
            variant="contained">
            Got IT!
          </Button>
        </div>
      </div>
    )
  }
}
