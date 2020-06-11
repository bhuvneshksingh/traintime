import React, { Component } from 'react'
import Grow from '@material-ui/core/Grow'

export default class PhotoPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: true,
    }
  }

  render() {
    const { animate } = this.state
    const key = this.props.index

    return (
      <Grow
        in={animate}
        style={{ transformOrigin: '0 0 0' }}
        {...(animate ? { timeout: 500 * key } : {})}>
        <img
          className="preview"
          onClick={() => this.props.changePhoto(key)}
          src={this.props.url}
          alt={this.props.name}
        />
      </Grow>
    )
  }
}
