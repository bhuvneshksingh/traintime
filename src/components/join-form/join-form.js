import React, { Component, Fragment } from 'react'
import { Button } from '@material-ui/core'
// import { FilePdfIcon, MinusIcon, PlusIcon } from '../../icons'
// import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import JoinEvent from '../join-event'
import JoinEventDialog from '../join-event'

export default class JoinForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joinDialogStatus: false,
      isJoinedEvend: false,
      isOwnEvent: false,
      render: false,
    }
  }

  componentDidMount() {
    const { user, eventId } = this.props

    const isJoinedEvend =
      user.joinedEvents.filter(event => event.id !== eventId).length !== 0

    const isOwnEvent =
      user.events.filter(event => event.id !== eventId).length !== 0

    this.setState(prevState => ({ ...prevState, isJoinedEvend, isOwnEvent }))
  }

  openJoinDialog = () => {
    this.setState(prevState => ({ joinDialogStatus: true }))
  }

  closeJoinDialog = () => {
    this.setState(prevState => ({ ...prevState, joinDialogStatus: false }))
  }

  handleClick = () => {
    this.setState({ render: !this.state.render })
  }

  handleClickOpen = () => {
    this.setState({ joinDialogStatus: true })
  }

  render() {
    const { rootClass } = this.props
    const { isJoinedEvend, isOwnEvent, render } = this.state

    return (
      <div className={`join-form ${rootClass ? rootClass : ''}`}>
        {isOwnEvent ? (
          <div>You a owner of this event</div>
        ) : (
          <Fragment>
            <h4>How many guests with come with you?</h4>

            <Button
              className="join-button"
              variant="contained"
              color="primary"
              disabled={isJoinedEvend}
              onClick={this.handleClickOpen}>
              {isJoinedEvend ? 'You are joined' : 'Join to this event'}
            </Button>
            {render && <JoinEvent />}

            <Button className="wishlist-button" color="secondary">
              <FavoriteIcon />
              Add to wishlist
            </Button>

            <JoinEventDialog
              open={this.state.joinDialogStatus}
              onClose={this.closeJoinDialog}
              eventId={this.props.eventId}
              userId={this.props.userId}
            />
          </Fragment>
        )}
      </div>
    )
  }
}
