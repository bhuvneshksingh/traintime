import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { withTranslation } from 'react-i18next'

class DeleteDialog extends Component {
  // {t} decomponsition , when using decompositor need to wrap in {}
  render() {
    const { t, handleClose, open, onConfirm } = this.props
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-event-dialog-title"
        aria-describedby="delete-event-dialog-content">
        <DialogTitle id="delete-event-dialog-title">
          {t('delete-event-dialog-title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-event-dialog-content">
            {t('delete-event-dialog-content')}
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

export default withTranslation()(DeleteDialog)
