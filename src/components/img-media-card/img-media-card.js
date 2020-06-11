import React, { Component } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import './img-media-card.css'

export default class ImgMediaCard extends Component {
  // constructor(props) {
  //   super(props)
  // }

  sendData = () => {
    this.props.deleteThisItem(this.props.keyId)
  }

  render() {
    return (
      <Card className="card__photo">
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.title}
            height="140"
            image={this.props.imageUrl}
            title={this.props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" onClick={this.sendData}>
            Delete
          </Button>
        </CardActions>
      </Card>
    )
  }
}
