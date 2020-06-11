import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

// import Rating from '@material-ui/lab/Rating'
import LinearProgress from '@material-ui/core/LinearProgress'

import PeopleIcon from '@material-ui/icons/PeopleOutline'

import { Map } from 'google-maps-react'

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  VKShareButton,
  VKIcon,
} from 'react-share'

import PageSection from '../../components/page-section'

import Gallery from '../../components/gallery'

import EventLocationItem from '../../components/event-location-item'
import EventDifficultyLevel from '../../components/event-difficulty-level'
import RecomendedEventsBanner from '../../components/recomended-events'
import RecomendedUsersBanner from '../../components/recomended-users'

import { Weather } from '../../components'

import {
  EarthIcon,
  PeopleJoinedIcon,
  TimeIcon,
  TimeSandIcon,
} from '../../icons'

import ParticipantItem from '../../components/participant'
// import Document from '../../components/document'
// import Waypoint from '../../components/waypoint'
// import ReviewCard from '../../components/review-card'
// import Slider from '../../components/slider'
// import Dataset from '../Home/data'
import JoinForm from '../../components/join-form'
// import CreateNewReview from '../../components/create-new-review'

import { getSportEvent } from '../../utils/api/sport-event'
import { getDuration } from '../../utils/date-calculator'

class EventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataInitialized: false,
    }
  }
  openUserPage = (user, type) => {
    const { push } = this.props.history
    push(`/profile/${user.id}`, {})
  }

  openEventPage = (event, type) => {
    const { push } = this.props.history
    push(`/event/${event.id}`, {})
  }

  componentDidMount() {
    const eventId = this.props.match.params.eventId
    const locale = this.props.locale.value

    getSportEvent(eventId, locale).then(this.processEventData)
  }

  processEventData = result => {
    switch (result.status) {
      case 200:
        this.setState(prevState => ({
          ...prevState,
          ...result.data,
          dataInitialized: true,
        }))
        break
      case 404:
        this.props.history.push('/not-found', { page: 'event', error: 404 })
        break
      default:
        this.props.history.push('/not-found', { page: 'event', error: 500 })
    }
  }

  render() {
    const { t } = this.props
    const {
      eventInfo,
      userInfo,
      images,
      // comments,
      startLocation,
      participants,
      waypoints,
    } = this.state

    const albums = [
      {
        title: 'Album 1',
        description: 'Description 1',
        location: 'Location 1',
        images,
      },
    ]

    const url = `www.${window.location.host}${window.location.pathname}`

    return (
      <Fragment>
        {this.state.dataInitialized ? (
          <Fragment>
            <PageSection>
              <Gallery albums={albums} mode={'event'} />
            </PageSection>
            <PageSection>
              <div className="container custom-my-event">
                <h1 className="event-title">{eventInfo.name}</h1>

                <div className="personal-info">
                  <img src={userInfo.avatar.url} alt={userInfo.avatar.name} />

                  <h3>{userInfo.fullName}</h3>
                  <div className="location">
                    <div>
                      <EarthIcon />
                      <p>
                        {`${t('speaks')}: `}
                        {userInfo.languages.map((lang, index, arr) => {
                          const lastElementIndex = arr.length - 1
                          return index === lastElementIndex
                            ? `${lang.name}`
                            : `${lang.name}, `
                        })}
                      </p>
                    </div>
                    {/* <div>
                      <Rating value={4.6} readOnly />
                      <p>
                        {comments.length === 0
                          ? t('no-reviews')
                          : `${comments.length} ${t('reviews')}`}
                      </p>
                    </div> */}
                  </div>
                </div>

                <div className="event-key-info">
                  <div className="key-info-section">
                    <div className="event-location-container">
                      <h4>{t('location')}</h4>
                      <EventLocationItem
                        type="start"
                        title={startLocation.address}
                      />
                      {waypoints.map((waypoint, index, arr) => {
                        return arr.length - 1 !== index ? (
                          <EventLocationItem
                            key={index}
                            type="middle"
                            title={waypoint.address}
                          />
                        ) : (
                          <EventLocationItem
                            key={index}
                            type="end"
                            title={waypoint.address}
                          />
                        )
                      })}
                    </div>
                    <div className="event-dificulty-container">
                      <h4>{t('difficulty')}</h4>
                      <EventDifficultyLevel type={eventInfo.difficulty} />
                    </div>
                    <h4>{t('duration')}</h4>
                    <div className="item">
                      <TimeSandIcon />
                      <p>{getDuration(eventInfo.duration)}</p>
                    </div>
                  </div>

                  <div className="key-info-section">
                    <h4>{t('schedule')}</h4>
                    <div className="item">
                      <TimeIcon />
                      <p> {`${t('start-at')}: ${eventInfo.startTime}`}</p>
                    </div>
                    <div className="item">
                      <TimeIcon />
                      <p> {`${t('end-at')}: ${eventInfo.endTime}`}</p>
                    </div>

                    <h4>{t('participants')}</h4>
                    <div className="item">
                      <PeopleIcon />
                      <p>{`${eventInfo.maxPlaces} ${t('places')}`}</p>
                    </div>
                    <div className="item">
                      <PeopleJoinedIcon />
                      <p>
                        {eventInfo.amountOfParticipants === 0
                          ? t('no-joined-people')
                          : `${eventInfo.amountOfParticipants} ${t(
                              'people-joined'
                            )}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div className="included-options">
                  <h4>Included</h4>

                  <div className="item">
                    <FoodVariantIcon />
                    <p>Food</p>
                  </div>
                  <div className="item">
                    <DrinksIcon />
                    <p>Drinks</p>
                  </div>

                  <div className="item">
                    <DrinksIcon />
                    <p>Equipment</p>
                  </div>
                </div> */}

                <div className="about-event-page">
                  <h3>{t('about-event')}</h3>
                  <p>{eventInfo.description}</p>
                  <h3>{t('rules')}</h3>
                  <p>{eventInfo.rules}</p>
                  <h3>{t('requirements')}</h3>
                  <ul>
                    {eventInfo.requirements.length === 0
                      ? t('no-requirements')
                      : eventInfo.requirements.map((requirement, index) => (
                          <li key={index}>
                            <p>{requirement.name}</p>
                          </li>
                        ))}
                  </ul>
                  {/* <h3>{t('route-description')}</h3>
                  <p>{eventInfo.routeDescription} </p> */}
                </div>

                <JoinForm
                  rootClass={'join-this-event-form'}
                  user={this.props.user}
                  userId={this.props.user.id}
                  eventId={eventInfo.id}
                />

                <Weather
                  rootClass={'weather-event-page'}
                  date={eventInfo.weather}
                  cityId={startLocation.city.code}
                  cityCoord={startLocation.city.coordinates}
                />

                <div className="social-event">
                  <h4>{t('share')}</h4>
                  <div>
                    <FacebookShareButton url={url}>
                      <FacebookIcon size={38} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={url}>
                      <TwitterIcon size={38} round={true} />
                    </TwitterShareButton>
                    <VKShareButton url={url}>
                      <VKIcon size={38} round={true} />
                    </VKShareButton>
                    <WhatsappShareButton url={url}>
                      <WhatsappIcon size={38} round={true} />
                    </WhatsappShareButton>
                    <TelegramShareButton url={url}>
                      <TelegramIcon size={38} round={true} />
                    </TelegramShareButton>
                    <ViberShareButton url={url}>
                      <ViberIcon size={38} round={true} />
                    </ViberShareButton>
                  </div>
                </div>

                <div className="google-map-event">
                  <Map
                    google={this.props.google}
                    zoom={8}
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                    }}
                    initialCenter={startLocation.city.coordinates}
                  />
                </div>

                <div className="participants">
                  <h4>{t('participants')}</h4>
                  {participants.length === 0
                    ? t('no-joined-people')
                    : participants.map((participant, index) => (
                        <ParticipantItem key={index} {...participant} />
                      ))}
                </div>
              </div>
            </PageSection>

            {/* <PageSection>
              <h3> Additional info here</h3>
              <div className="addition-info">
                <Document />
                <Document />
                <Document />
                <Document />
              </div>
            </PageSection> */}

            {/* <PageSection>
              <h3 className="waypoints">Waypoints</h3>
              <Waypoint />
              <Waypoint />
              <Waypoint />
              <Waypoint />
            </PageSection> */}
            {/* <PageSection className="reviews-event-page">
              <div className="reviews">
                <h3>Reviews</h3>
                <p>100 reviews</p>
                <CreateNewReview />
              </div>

              <div className="rates">
                <div>
                  <Rating value={5} readOnly />
                  <p>Route</p>
                </div>
                <div>
                  <Rating value={5} readOnly />
                  <p>Service</p>
                </div>
                <div>
                  <Rating value={5} readOnly />
                  <p>Description quality</p>
                </div>
                <div>
                  <Rating value={5} readOnly />
                  <p>Location</p>
                </div>
              </div>

              <ReviewCard />  
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
            </PageSection> */}

            <PageSection>
              <RecomendedEventsBanner />
            </PageSection>

            <PageSection>
              <RecomendedUsersBanner />
            </PageSection>
          </Fragment>
        ) : (
          <Fragment>
            <LinearProgress />
            <PageSection />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyAJbckjrDMtdIyp0H9fmMgq9iL_vjCEw8E',
// })(EventPage)

const mapStateToProps = store => {
  return {
    currentCountry: store.system.currentUserLocation.country,
    currentCity: store.system.currentUserLocation.city,
    locale: store.system.locale,
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => ({})

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(EventPage)
)
