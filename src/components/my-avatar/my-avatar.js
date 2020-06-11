import React, { Component, Fragment } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { getKeyUserData, getGravatar } from '../../utils/api/user'
import { getImageUrl } from '../../utils/api/media'

export default class MyAvatar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatarUrl: '',
      gravatarUrl: '',
      nameLetters: 'U',
      isReady: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(this.getUserInfo())
  }

  getUserInfo = () => {
    getKeyUserData().then(response => {
      const data = response.payload

      this.getAvatar(data.avatarImageId)
      this.getGravatar(data.email)
      this.getNameLetters(data.firstName, data.lastName)
      this.setState({ isLoading: false })
    })
  }

  getAvatar = avatarId => {
    if (avatarId) {
      getImageUrl(avatarId).then(myAvatarUrl => {
        this.setState({ avatarUrl: `${myAvatarUrl}?height=200` })
      })
    }
  }

  getGravatar = myEmail => {
    if (myEmail) {
      getGravatar(myEmail).then(gravatar => {
        this.setState({ gravatarUrl: gravatar })
      })
    }
  }

  getNameLetters = (firstName, lastName) => {
    if (firstName && lastName) {
      const initials = firstName.split('')[0] + lastName.split('')[0]
      this.setState({ nameLetters: initials })
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.avatarUrl ? (
          <Avatar sizes="40px" src={`${this.state.avatarUrl}`} />
        ) : this.state.gravatarUrl ? (
          <Avatar sizes="40px" src={`${this.state.gravatarUrl}`} />
        ) : (
          <Avatar sizes="40px">{`${this.state.nameLetters}`}</Avatar>
        )}
      </Fragment>
    )
  }
}
