import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withTranslation } from 'react-i18next'

class DiscardDialog extends Component {
  render() {
    const { t, handleClose, open, onConfirm } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="discard-event-dialog-title"
        aria-describedby="discard-event-dialog-content">
        <DialogTitle id="discard-event-dialog-title">
          {t('discard-event-dialog-title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="discard-event-dialog-content">
            {t('discard-event-dialog-content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {t('cancel')}
          </Button>
          <Button
            onClick={onConfirm}
            color="primary"
            autoFocus
            variant="outlined">
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withTranslation()(DiscardDialog)
