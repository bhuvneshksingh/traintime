import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
  getMyEvents,
  deleteEvent,
  getMyJoinedEvents,
  deleteEventParticipant,
} from '../../utils/api/sport-event'
import MyEvent from '../../components/my-event-card'
import PageSection from '../../components/page-section'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
// import Skeleton from '@material-ui/lab/Skeleton'
import Slider from '../../components/slider'
import NotFoundBanner from '../../components/not-found-banner'
import DeleteDialog from './dialogs/delete-dialog'
import DiscardDialog from './dialogs/discard-dialog'
import { withTranslation } from 'react-i18next'
const expData = [
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

class MyEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false,
      events: [],
      joinedEvents: [],
      isLoading: false,
      isChange: false,
      showDeleteDialog: false,
      showDiscardDialog: false,
      deleteMyEventId: null,
      deleteMyEventIndex: null,
      deleteMyJoinedEventId: null,
      deleteMyJoinedEventIndex: null,
    }
  }

  openCreateEvent = () => {
    this.props.history.push('/create-activity', {})
  }

  onDialogOpen = () => {
    this.setState({ showDialog: true })
  }

  onDialogClose = () => {
    this.setState({
      showDialog: false,
      showDeleteDialog: false,
      showDiscardDialog: false,
      deleteMyEventId: null,
      deleteMyEventIndex: null,
      deleteMyJoinedEventId: null,
      deleteMyJoinedEventIndex: null,
    })
  }

  getEvents = () => {
    const { user, locale } = this.props

    getMyEvents(user.id, locale.value).then(experiences => {
      if (experiences) {
        this.setState({ events: [...experiences], isLoading: false })
      }
    })
    getMyJoinedEvents(user.id, locale.value).then(experiences => {
      if (experiences) {
        this.setState({ joinedEvents: [...experiences], isLoading: false })
      }
    })
  }

  deleteMyEvent = () => {
    const {
      events,
      deleteMyEventId: eventId,
      deleteMyEventIndex: index,
    } = this.state
    const { user } = this.props

    events.splice(index, 1)

    deleteEvent(eventId, user.id).then(status => {
      if (status === 200)
        this.setState(prevState => ({
          ...prevState,
          events,
          showDeleteDialog: false,
          deleteMyEventId: null,
          deleteMyEventIndex: null,
        }))
    })
  }

  discardMyJoinedEvent = () => {
    const {
      joinedEvents,
      deleteMyJoinedEventId: eventId,
      deleteMyEventIndex: index,
    } = this.state
    const { user, locale } = this.props

    joinedEvents.splice(index, 1)

    deleteEventParticipant(user.id, eventId, locale.value).then(status => {
      if (status === 200)
        this.setState(prevState => ({
          ...prevState,
          joinedEvents,
          showDiscardDialog: false,
          deleteMyJoinedEventId: null,
          deleteMyEventIndex: null,
        }))
    })
  }

  onClickConfirm = type => {
    // if(type==='delete-event'){this.deleteMyEvent()}
  }

  openDeleteDialog = (eventId, index) => {
    this.setState(prevState => ({
      ...prevState,
      showDeleteDialog: true,
      deleteMyEventId: eventId,
      deleteMyEventIndex: index,
    }))
  }

  openDiscardDialog = (eventId, index) => {
    this.setState(prevState => ({
      ...prevState,
      showDiscardDialog: true,
      deleteMyJoinedEventId: eventId,
      deleteMyJoinedEventIndex: index,
    }))
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.getEvents()
  }

  componentDidUpdate(prevState) {
    if (this.state.isChange !== prevState.isChange) {
      // this.getUserExperiences()
    }
  }

  render() {
    const { events, joinedEvents } = this.state
    const { t } = this.props

    return (
      <PageSection>
        <div className="my-events-content-container">
          <h1>{t('my-events')}</h1>
          <div className="gallery">
            <header className="gallery__header"></header>
            <div className="gallery__cards">
              {events.length === 0 ? (
                <NotFoundBanner
                  title={t('title-not-found')}
                  subtitle={t('subtitle-not-found')}
                />
              ) : (
                <Slider>
                  {events.map((event, i) => (
                    <MyEvent
                      key={i}
                      index={i}
                      event={event}
                      type="my-event"
                      onDelete={this.openDeleteDialog}
                    />
                  ))}
                </Slider>
              )}

              {/* {events && events.length > 0
                ? events.map((card) => <MyEvent data1={card.id} data2={card} />)
                : expData.map((card) => (
                    <div className="card">
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
                  ))} */}
            </div>
            <h1>{t('events-joined')}</h1>
            <header className="gallery__header"></header>
            {joinedEvents.length === 0 ? (
              <NotFoundBanner
                title={t('title-for-joined-banner')}
                subtitle={t('subtitle-for-joined-banner')}
              />
            ) : (
              <Slider>
                {joinedEvents.map((event, i) => (
                  <MyEvent
                    key={i}
                    index={i}
                    event={event}
                    type="joined-event"
                    onDiscard={this.openDiscardDialog}
                  />
                ))}
              </Slider>
            )}

            {/* <div className="gallery__cards">
              {joinedEvents && joinedEvents.length > 0
                ? joinedEvents.map((card) => (
                    <MyEvent data1={card.id} data2={card} />
                  ))
                : expData.map((card) => (
                    <div className="card">
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
                    </div> */}
            {/* ))} */}
            {/* </div> */}
          </div>
          <div className="addAlbumBtn">
            <Tooltip title="Add Event" aria-label="add">
              <Fab
                size="large"
                color="primary"
                aria-label="add"
                onClick={this.openCreateEvent}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>
        <DeleteDialog
          handleClose={this.onDialogClose}
          open={this.state.showDeleteDialog}
          onConfirm={this.deleteMyEvent}
        />
        <DiscardDialog
          handleClose={this.onDialogClose}
          open={this.state.showDiscardDialog}
          onConfirm={this.discardMyJoinedEvent}
        />
      </PageSection>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    locale: state.system.locale,
  }
}

export default withTranslation()(connect(mapStateToProps)(MyEvents))
