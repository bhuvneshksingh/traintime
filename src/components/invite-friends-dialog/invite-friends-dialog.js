import React, { Component } from 'react'

import { withTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
// import TextField from '@material-ui/core/TextField'

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  VKShareButton,
  VKIcon,
} from 'react-share'

class InviteFriendsDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { t } = this.props

    const url = `www.${window.location.host}${window.location.pathname}`
    // const message = 'Some default message to friend'

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="invite-friends-dialog-title"
        aria-describedby="invite-friends-dialog-description"
        className="invite-friends-dialog">
        <DialogTitle
          id="invite-friends-dialog-title"
          className="invite-friends-dialog">
          {t('choose-social-network')}
        </DialogTitle>
        <DialogContent>
          {/* <TextField
                required
                multiline
                rows="3"
                id="message-to-friend"
                label={t('your-message')}
                defaultValue={message}
                margin="normal"
                variant="outlined"
                className="share-message"
              />
              <Divider />
              <h4>{t('choose-social-network')}</h4> */}
          <div className="share-buttons-container">
            <FacebookShareButton url={url} className="share-button">
              <FacebookIcon size={38} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={url} className="share-button">
              <TwitterIcon size={38} round={true} />
            </TwitterShareButton>
            <VKShareButton url={url} className="share-button">
              <VKIcon size={38} round={true} />
            </VKShareButton>
            <WhatsappShareButton url={url} className="share-button">
              <WhatsappIcon size={38} round={true} />
            </WhatsappShareButton>
            <TelegramShareButton url={url} className="share-button">
              <TelegramIcon size={38} round={true} />
            </TelegramShareButton>
            <ViberShareButton url={url} className="share-button">
              <ViberIcon size={38} round={true} />
            </ViberShareButton>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withTranslation()(InviteFriendsDialog)
