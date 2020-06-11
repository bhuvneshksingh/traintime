import React, { Component } from 'react'

import { Switch, Route, withRouter } from 'react-router-dom'
import ProtectedRoute from '../components/protected-route'
import { connect } from 'react-redux'

import HomePage from './Home'
import ProfilePage from './Profile'
import LoginPage from './Login'
import RegistrationPage from './Registration'
import EventPage from './Event'
import Confirmation from './Confirmation'
import PersonalInfo from './PersonalInfo'
import NewsFeed from './NewsFeed'
import CreateEvent from './CreateEvent'
import SettingsPage from './Settings'
import MyMediaPage from './MyMedia'
import MyEventsPage from './MyEvents'
import NotFoundPage from './NotFoundPage'

import PageContainer from '../components/page-container'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Preloader from '../components/preloader'

import { setCurrentLocation } from '../store/actions/system'
import { setUserData } from '../store/actions/user'

import { getUserLocation } from '../utils/api/system'
import { getKeyUserData, getDefaultAvatarImage } from '../utils/api/user'

import { getImageData } from '../utils/api/media'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appInitialized: false,
    }
  }

  componentDidMount() {
    this.downloadInitializeData()
  }

  downloadInitializeData = async () => {
    const { locale, setUserData, setCurrentLocation, history } = this.props

    if (!this.state.appInitialized) {
      const userDataPromise = getKeyUserData(locale.value)
      const currentLocationPromise = getUserLocation()

      const userResponse = await userDataPromise
      const currentUserLocation = await currentLocationPromise
      const user = userResponse.payload

      if (userResponse.status === 200) {
        const avatarPhoto = await getImageData(user.avatarImageId, locale.value)

        const data = {
          registered: true,
          confirmed: user.confirmed,
          id: user.id,
          authUserId: user.authUserId,
          firstName: user.firstName,
          lastName: user.lastName,
          events: user.events,
          joinedEvents: user.joinedEvents,
          avatarPhotoUrl: avatarPhoto
            ? avatarPhoto.url
            : getDefaultAvatarImage(user.gender),
        }
        setUserData(data)
      } else {
        const data = {
          registered: false,
          confirmed: false,
          id: null,
          authUserId: null,
          firstName: null,
          lastName: null,
          avatarPhoto: null,
          location: null,
          joinedEvents: [],
          events: [],
        }

        setUserData(data)
      }

      if (currentUserLocation)
        setCurrentLocation({ currentUserLocation, isSystemInitialized: true })
      else
        setCurrentLocation({ currentUserLocation, isSystemInitialized: false })

      this.setState({ appInitialized: true })
    }

    if (
      this.state.appInitialized &&
      this.props.user.registered &&
      !this.props.user.confirmed
    ) {
      history.push('/personal-info', {})
    }
  }

  render() {
    const { appInitialized } = this.state

    return (
      <PageContainer>
        <Navbar position="relative" />
        {appInitialized ? (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile/:profileId" component={ProfilePage} />
            <Route exact path="/event/:eventId" component={EventPage} />

            <Route exact path="/registration" component={RegistrationPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/confirmation" component={Confirmation} />

            <Route exact path="/personal-info" component={PersonalInfo} />
            <ProtectedRoute exact path="/news-feed" component={NewsFeed} />
            <ProtectedRoute
              exact
              path="/create-activity"
              component={CreateEvent}
            />

            <ProtectedRoute
              exact
              path="/edit-activity"
              component={CreateEvent}
            />

            <ProtectedRoute exact path="/settings" component={SettingsPage} />

            <ProtectedRoute exact path="/my-media" component={MyMediaPage} />

            <ProtectedRoute exact path="/my-events" component={MyEventsPage} />
            <Route exact path="/not-found" component={NotFoundPage} />
            <Route component={NotFoundPage} />
          </Switch>
        ) : (
          <Preloader />
        )}

        <Footer />
      </PageContainer>
    )
  }
}

const mapStateToProps = store => {
  return { system: store.system, user: store.user, locale: store.system.locale }
}

const mapDispatchToProps = dispatch => ({
  setUserData: data => dispatch(setUserData(data)),
  setCurrentLocation: data => dispatch(setCurrentLocation(data)),
  // initializeHomePageData: data => dispatch(initializeHomePageData(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
