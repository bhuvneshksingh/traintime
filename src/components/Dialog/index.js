import React, { Component } from 'react'
import { createAlbum } from '../../utils/api/media'
import { default as MaterialDialog } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '../../components/Button'
import AddIcon from '@material-ui/icons/Add'
// import iconAddPhoto from './../../assets/icons/add-photo.svg'
import VideoCallIcon from '@material-ui/icons/VideoCall'
// import iconVideo from './../../assets/icons/video.svg'

import './index.css'

export default class Dialog extends Component {
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
      <MaterialDialog
        className="dialog"
        onClose={this.props.onClose}
        open={this.props.open}>
        <DialogContent className="dialog__content">
          <div className="album">
            <header className="album__header">
              <TextField
                id="outlined-bare"
                className="album__title"
                defaultValue={this.state.albumName}
                onChange={event =>
                  this.setState({ albumName: event.target.value })
                }
                margin="normal"
                placeholder="Album name"
                variant="outlined"
              />
              <div className="album__actions">
                <Button className="button-photo" typeSecondary>
                  <AddIcon />
                  Add photo
                </Button>
                <Button className="button-video" typeSecondary>
                  <VideoCallIcon />
                  Add link for video
                </Button>
              </div>
            </header>
            {/* <div className="album__body">
              {albumData.map(album => (
                <Card
                  key={album.id}
                  imageUrl={album.imageUrl}
                  title={album.title}
                  location={album.location}
                  description={album.description}
                  typePhoto
                />
              ))}
            </div> */}
          </div>
        </DialogContent>
        <DialogActions className="dialog__actions">
          <Button className="button-cancel" onClick={this.props.onClose}>
            cancel
          </Button>
          <Button className="button-save" onClick={this.sendData} typePrimary>
            save
          </Button>
        </DialogActions>
      </MaterialDialog>
    )
  }
}
