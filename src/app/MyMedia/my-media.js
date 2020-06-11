import React, { Component, Fragment } from 'react'
import {
  getAlbums,
  createAlbum,
  deleteAlbum,
  updateAlbum,
} from '../../utils/api/media'
import Card from '../../components/Card'
// import Navbar from '../../components/navbar'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Skeleton from '@material-ui/lab/Skeleton'
import DialogAlbums from '../../components/dialog-albums'
import DialogMedia from '../../components/dialog-media'

import PageSection from '../../components/page-section'

const albumData = [
  {
    id: 1,
    path: 'https://picsum.photos/300/150',
    name: 'Sample media',
    location: '',
    description: 'urna nunc id cursus metus aliquam eleifend mi in nulla',
  },
  {
    id: 2,
    path: 'https://picsum.photos/300/150',
    name: 'Sample media',
    location: '',
    description: 'urna nunc id cursus metus aliquam eleifend mi in nulla',
  },
  {
    id: 3,
    path: 'https://picsum.photos/300/150',
    name: 'Sample media',
    location: '',
    description: 'urna nunc id cursus metus aliquam eleifend mi in nulla',
  },
]

export default class MyMedia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false,
      showDialogMedia: false,
      displayAlbumName: '',
      selectedAlbumId: '',
      albums: [],
      isLoading: false,
      isChange: false,
    }
  }

  onDialogOpen = () => {
    this.setState({ showDialog: true })
  }

  onDialogClose = () => {
    this.setState({ showDialog: false })
  }

  onDialogMediaOpen = (albumName, albumId) => {
    this.setState({
      showDialogMedia: true,
      displayAlbumName: albumName,
      selectedAlbumId: albumId,
    })
  }

  onDialogMediaClose = () => {
    this.setState({ showDialogMedia: false })
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(this.getUserAlbums())
  }

  componentDidUpdate(prevState) {
    if (this.state.isChange !== prevState.isChange) {
      this.getUserAlbums()
    }
  }

  getUserAlbums = () => {
    getAlbums().then(albumUser => {
      if (albumUser) {
        this.setState({ albums: [...albumUser], isLoading: false })
      }
    })
  }

  addNewAlbum = data => {
    createAlbum(data)
    this.setState({ showDialog: false, isChange: !this.state.isChange })
  }

  deleteOneAlbum = albumId => {
    deleteAlbum(albumId)
    this.setState({ isChange: !this.state.isChange })
  }

  editAlbumName = (newName, albumId) => {
    updateAlbum(newName, albumId)
    this.setState({ isChange: !this.state.isChange })
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          <h1 className="primary-heading">
            Upload pictures and videos about your sport life
          </h1>
          <div className="gallery">
            <header className="gallery__header">
              <div className="gallery__title">My Albums</div>
            </header>
            <div className="gallery__cards">
              {this.state.albums && this.state.albums.length > 0
                ? this.state.albums
                    // .filter(card => card.images.length > 0)
                    .map((card, i) => (
                      <Card
                        key={i}
                        keyId={card.id}
                        editThisItem={this.editAlbumName}
                        deleteThisItem={this.deleteOneAlbum}
                        openDialogMedia={this.onDialogMediaOpen}
                        imageUrl={
                          card.images.length > 0
                            ? card.images[0].url
                            : 'https://static.train-time.com/icons/icons8-picture-240.png'
                        }
                        title={card.name}
                        typeAlbum
                      />
                    ))
                : albumData.map((card, i) => (
                    <div className="card" key={i}>
                      <Skeleton variant="rect" height={150} width={286} />
                      <div className="skeleton">
                        <span className="skeleton__text">
                          <Skeleton variant="text" height={10} width={200} />
                          <Skeleton variant="text" height={10} width={200} />
                        </span>
                        <Skeleton
                          className="skeleton__deleteBtn"
                          variant="circle"
                          height={50}
                          width={50}
                        />
                      </div>
                    </div>
                  ))}
            </div>
            <div className="addAlbumBtn">
              <Tooltip title="Add Album" aria-label="add">
                <Fab
                  size="large"
                  color="primary"
                  aria-label="add"
                  onClick={this.onDialogOpen}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </div>
          </div>

          <footer className="gallery__actions" />
        </div>
        <DialogAlbums
          open={this.state.showDialog}
          onClose={this.onDialogClose}
          albumName={this.addNewAlbum}
        />
        <DialogMedia
          open={this.state.showDialogMedia}
          onClose={this.onDialogMediaClose}
          albumName={this.state.displayAlbumName}
          albumId={this.state.selectedAlbumId}
        />
      </Fragment>
    )
  }
}
