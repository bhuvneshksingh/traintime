import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'

export default class AlbumPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardWidth: 0,
      cardHeight: 0,
    }
  }

  componentDidMount() {
    this.setState({
      cardWidth: document.querySelector('.album-card').clientWidth,
      cardHeight: document.querySelector('.album-card').clientHeight,
    })
  }

  render() {
    const { name, images, changeAlbum, albumIndex } = this.props

    console.debug('album images', images)

    return (
      <Card className="album-card">
        <CardActionArea onClick={() => changeAlbum(albumIndex)}>
          <CardMedia className="media" image={images[0].url} title={name}>
            <div className="card-media-description">
              <h5>{name}</h5>
              <p>{images.length} pictures</p>
            </div>
          </CardMedia>
        </CardActionArea>
      </Card>
    )
  }
}
