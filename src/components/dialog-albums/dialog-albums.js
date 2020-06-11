import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './dialog-albums.css'

export default class DialogAlbums extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumName: '',
    }
  }

  sendData = () => {
    this.props.albumName(this.state.albumName)
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title"
        className="dialog-albums">
        <DialogTitle id="form-dialog-title">Create Album</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can create new albums and enable privacy options.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            defaultValue={this.state.albumName}
            onChange={event => this.setState({ albumName: event.target.value })}
            label="Enter the name for new album"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <FormGroup row>
            <FormControlLabel
              control={<Switch value="checkedC" />}
              label="Private"
            />
          </FormGroup>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.sendData} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
