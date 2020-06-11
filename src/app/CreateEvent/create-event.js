import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

// import ActivityTypeItem from '../../components/activity-type-item'

import Step from '../../components/event-step-counter'

import Button from '@material-ui/core/Button'
import EventAnswers from '../../components/event-answers'
import EventDescription from '../../components/event-description'
import SetRequirements from '../../components/set-requirements'
import CreateEventLocation from '../../components/create-event-location'
import SetDateEvent from '../../components/set-date-event'
import AddPhotosSportingLife from '../../components/add-photos-sporting-life'
import AmountPicker from '../../components/amount-picker'
import Collapse from '@material-ui/core/Collapse'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import CircularProgress from '@material-ui/core/CircularProgress'

// import EventIcon from '../../assets/ic_calendar.svg'
// import TrainingIcon from '../../assets/ic_rowing.svg'
// import MentoringIcon from '../../assets/ic_mentor.svg'
// import CompetitionIcon from '../../assets/ic_podium.svg'

import { ActivityType, TripType } from '../../utils/data-types'
import {
  createSportEvent,
  getSportEvent,
  updateSportEvent,
} from '../../utils/api/sport-event'

import { getSportTypeById } from '../../utils/api/sport-type'

import { DAY, getAmountOfDays } from '../../utils/date-calculator'

class CreateEvent extends Component {
  constructor(props) {
    super(props)
    const { t } = props
    const steps = t('createEventSteps')
    const eventTypes = t('createEventTypes')

    this.state = {
      steps: steps,
      numberOfSteps: 5,
      currentStep: 0,
      eventTypes: eventTypes,
      isStep1Showing: true,
      isStep2Showing: false,
      isStep3Showing: false,
      isStep4Showing: false,
      isStep5Showing: false,
      isStep6Showing: false,
      data: {
        activityType: ActivityType.FreeEvent,
        tripValue: TripType.No,
        sportType: null,
        participants: 0,
        coverImageId: null,
        coverImageSrc: '',
        eventName: '',
        eventDescription: '',
        rules: '',
        requirements: [],
        equipments: [],
        location: {},
        coordinates: {},
        waypoints: [],
        startDate: null,
        endDate: null,
        notificationInterval: 0,
        media: [],
      },
      initialStartAddress: null,
      initialWaypoints: null,
      isLocationInitialized: false,
      showProgress: false,
      showSnackBar: false,
      isSaved: false,
    }
  }

  static getDerivedStateFromProps(props, state) {
    return !state.isLocationInitialized
      ? {
          ...state,
          data: {
            ...state.data,
            coordinates: props.currentLocation,
          },
        }
      : {}
  }

  componentDidMount() {
    const { history, locale } = this.props

    if (history.location.state.type === 'edit-activity') {
      const eventId = history.location.state.eventId

      this.loadEventData(eventId, locale.value)
    }
  }

  loadEventData = async (eventId, locale) => {
    const result = await getSportEvent(eventId, locale)

    if (result.status === 200) {
      const data = result.data

      console.debug('load event data', data)

      this.setState(prevState => ({
        ...prevState,
        initialStartAddress: data.startLocation.address,
        initialWaypoints: data.waypoints.map(item => item.address),
        data: {
          activityType: ActivityType.FreeEvent,
          tripValue: TripType.No,
          sportType: data.eventInfo.sportType,
          participants: data.eventInfo.maxPlaces,
          coverImageId: data.eventInfo.coverPhoto.id,
          coverImageSrc: data.eventInfo.coverPhoto.url,
          eventName: data.eventInfo.name,
          eventDescription: data.eventInfo.description,
          rules: data.eventInfo.rules,
          requirements: data.eventInfo.requirements.map(
            requirement => requirement.name
          ),
          equipments: [],
          location: {},
          coordinates: {},
          waypoints: [],
          startDate: null,
          endDate: null,
          notificationInterval: 0,
          media: [],
        },
      }))
    }
  }

  // function to change windows/steps
  onPreviousClick = () => {
    const { currentStep } = this.state
    const index = currentStep <= 6 ? currentStep - 1 : currentStep

    this.changeStepState(index)
  }

  onNextClick = () => {
    const { currentStep } = this.state
    const index = currentStep !== 6 ? currentStep + 1 : currentStep

    this.changeStepState(index)
  }

  onFinishClick = async () => {
    this.setState(prevState => ({ ...prevState, showProgress: true }))

    const { history } = this.props

    const locale = this.props.locale.value

    let status = null
    if (history.location.state.type === 'edit-activity') {
      status = await updateSportEvent(this.state.data, locale)
    } else {
      status = await createSportEvent(this.state.data, locale)
    }

    switch (status) {
      case 201:
        this.setState(prevState => ({
          ...prevState,
          showProgress: false,
          isSaved: true,
          showSnackBar: true,
        }))

        setTimeout(() => {
          history.push('/my-events', {})
        }, 1000)
        break
      default:
        this.setState(prevState => ({
          ...prevState,
          showProgress: false,
          isSaved: false,
          showSnackBar: true,
        }))
        break
    }
    // this.props.history.push('/', {})
  }

  changeStepState = index => {
    switch (index) {
      case 0:
        this.setState({
          currentStep: index,
          isStep1Showing: true,
          isStep2Showing: false,
        })
        break
      case 1:
        this.setState({
          currentStep: index,
          isStep1Showing: false,
          isStep2Showing: true,
          isStep3Showing: false,
        })
        break
      case 2:
        this.setState({
          currentStep: index,

          isStep2Showing: false,
          isStep3Showing: true,
          isStep4Showing: false,
        })
        break
      case 3:
        this.setState({
          currentStep: index,

          isStep3Showing: false,
          isStep4Showing: true,
          isStep5Showing: false,
        })
        break
      case 4:
        this.setState({
          currentStep: index,

          isStep4Showing: false,
          isStep5Showing: true,
          isStep6Showing: false,
        })
        break
      case 5:
        this.setState({
          currentStep: index,

          isStep5Showing: false,
          isStep6Showing: true,
        })
        break
      default:
    }
  }

  onEventTypeClick = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case ActivityType.FreeEvent:
        this.setActivityType(type)
        break
      case ActivityType.Training:
        this.setActivityType(type)
        break
      case ActivityType.Mentoring:
        this.setActivityType(type)
        break
      case ActivityType.Competition:
        this.setActivityType(type)
        break
    }
  }

  setActivityType = type => {
    this.setState({
      ...this.state,
      isStep1Showing: false,
      isStep2Showing: true,
      currentStep: this.state.currentStep + 1,
      data: { ...this.state.data, activityType: type },
    })
  }

  setTrip = type => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        tripValue: type,
      },
    })
  }

  setSportType = sportType => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, sportType },
    })
  }

  setAmountOfParticipants = participants => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, participants },
    })
  }

  setCoverImage = coverImageId => {
    this.setState(prevState => ({
      ...prevState,
      data: { ...prevState.data, coverImageId },
    }))
  }

  setCoverImageSrc = coverImageSrc => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, coverImageSrc },
    })
  }

  setEventName = eventName => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, eventName },
    })
  }

  setEventDescription = eventDescription => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, eventDescription },
    })
  }

  setRules = rules => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, rules },
    })
  }

  setRequirement = requirement => {
    const {
      data: { requirements },
    } = this.state

    requirements.push(requirement)

    this.setState({
      ...this.state,
      data: { ...this.state.data, requirements },
    })
  }

  setEquipment = equipment => {
    const {
      data: { equipments },
    } = this.state

    equipments.push(equipment)

    this.setState({
      ...this.state,
      data: { ...this.state.data, equipments },
    })
  }

  deleteEquipment = index => {
    const {
      data: { equipments },
    } = this.state
    equipments.splice(index, 1)

    this.setState({
      ...this.state,
      data: { ...this.state.data, equipments },
    })
  }

  deleteRequirement = index => {
    const {
      data: { requirements },
    } = this.state

    requirements.splice(index, 1)

    this.setState({
      ...this.state,
      data: { ...this.state.data, requirements },
    })
  }

  setLocation = location => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, location, coordinates: location.coordinates },
      isLocationInitialized: true,
    })
  }

  setWaypoint = location => {
    const {
      data: { waypoints },
    } = this.state

    waypoints.push(location)

    this.setState({
      ...this.state,
      data: { ...this.state.data, waypoints },
    })
  }

  deleteWaypoint = index => {
    const {
      data: { waypoints },
    } = this.state

    waypoints.splice(index, 1)

    this.setState({
      ...this.state,
      data: { ...this.state.data, waypoints },
    })
  }

  setStartDate = startDate => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, startDate },
    })
  }

  setEndDate = endDate => {
    const { startDate } = this.state.data
    if (startDate) {
      if (startDate.getTime() < endDate.getTime()) {
        this.setState({
          ...this.state,
          data: { ...this.state.data, endDate },
        })
      } else {
        alert('End date time  not less than start date time')
      }
    } else {
      alert('Please select start date first')
    }

    // this.setState({
    //   ...this.state,
    //   data: { ...this.state.data, endDate },
    // })
  }

  setNotificationInterval = notificationInterval => {
    const { startDate } = this.state.data

    if (startDate) {
      const currentDate = new Date()
      const difference = startDate.getTime() - notificationInterval * DAY

      const lastDate = new Date(difference)

      if (currentDate.getTime() < lastDate.getTime()) {
        this.setState({
          ...this.state,
          data: { ...this.state.data, notificationInterval },
        })
      } else {
        const interval = startDate.getTime() - currentDate.getTime()
        const days = getAmountOfDays(interval)

        alert(
          `Notification interval can not be more than ${days - 1} ${
            days > 1 ? 'days' : 'day'
          }`
        )
      }
    } else {
      alert('Please select start date first')
    }
  }

  setMedia = images => {
    const {
      data: { media },
    } = this.state

    media.push(...images)

    this.setState({
      ...this.state,
      data: { ...this.state.data, media },
    })
  }

  deleteMedia = index => {
    const {
      data: { media },
    } = this.state

    media.splice(index, 1)

    this.setState({
      ...this.state,
      data: { ...this.state.data, media },
    })
  }

  render() {
    const { t } = this.props

    const {
      steps,
      currentStep,
      isStep1Showing,
      isStep2Showing,
      isStep3Showing,
      isStep4Showing,
      isStep5Showing,
      isStep6Showing,
      // isStep7Showing,
      // eventTypes: { eventType, trainingType, mentoringType, competitionType },
      data: {
        // activityType,
        // tripValue,
        sportType,
        participants,
        coverImageId,
        // coverImageSrc,
        eventName,
        eventDescription,
        rules,
        requirements,
        // equipments,
        location,
        // coordinates,
        // waypoints,
        startDate,
        endDate,
        // notificationInterval,
        media,
      },
    } = this.state

    // let isNextButton =
    //   currentStep == 0
    //     ? true
    //     : currentStep == 1 && sportType && participants > 0
    //     ? true
    //     : currentStep == 2 && coverImageId && eventName && eventDescription
    //     ? true
    //     : currentStep == 3 && rules && requirements && requirements.length > 0
    //     ? true
    //     : currentStep == 4 &&
    //       location &&
    //       location.address &&
    //       waypoints.length &&
    //       waypoints.length > 0
    //     ? true
    //     : currentStep == 5 && startDate && endDate
    //     ? true
    //     : currentStep == 6 && media && media.length > 0
    //     ? true
    //     : false

    let isNextButton =
      currentStep == 0 && sportType && participants > 0
        ? true
        : currentStep == 1 && coverImageId && eventName && eventDescription
        ? true
        : currentStep == 2 && rules && requirements && requirements.length > 0
        ? true
        : currentStep == 3 && location && location.address
        ? // waypoints.length &&
          // waypoints.length > 0
          true
        : currentStep == 4 && startDate && endDate
        ? true
        : currentStep == 5 && media && media.length > 0
        ? true
        : false

    return (
      <Fragment>
        <div className="section create-event-content">
          <Step {...steps[currentStep]} />
          <div className="steps-container">
            {/* <Collapse
              in={isStep1Showing}
              timeout={{ enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit>
              <Paper id="step-slide" className="activity-type-container">
                <ActivityTypeItem
                  src={EventIcon}
                  data={eventType}
                  isDisabled={false}
                  type={ActivityType.FreeEvent}
                  onClick={this.onEventTypeClick}
                />
                <ActivityTypeItem
                  src={TrainingIcon}
                  data={trainingType}
                  isDisabled={true}
                  type={ActivityType.Training}
                  onClick={this.onEventTypeClick}
                />
                <ActivityTypeItem
                  src={MentoringIcon}
                  data={mentoringType}
                  isDisabled={true}
                  type={ActivityType.Mentoring}
                  onClick={this.onEventTypeClick}
                />
                <ActivityTypeItem
                  src={CompetitionIcon}
                  data={competitionType}
                  isDisabled={true}
                  type={ActivityType.Competition}
                  onClick={this.onEventTypeClick}
                />
              </Paper>
            </Collapse> */}
            <Collapse
              in={isStep1Showing}
              timeout={{ enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit>
              <Paper id="step-slide">
                <EventAnswers
                  locale={this.props.locale}
                  tripType={this.state.data.tripValue}
                  setTrip={this.setTrip}
                  onSportSelect={this.setSportType}
                  sportType={this.state.data.sportType}>
                  <AmountPicker
                    value={this.state.data.participants}
                    onNumberSet={this.setAmountOfParticipants}
                  />
                </EventAnswers>
              </Paper>
            </Collapse>
            <Collapse
              direction={isStep2Showing ? 'left' : 'right'}
              in={isStep2Showing}
              timeout={{ enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit>
              <Paper id="step-slide">
                <EventDescription
                  coverImage={this.state.data.coverImageSrc}
                  setCoverImage={this.setCoverImage}
                  setCoverImageSrc={this.setCoverImageSrc}
                  eventName={this.state.data.eventName}
                  setEventName={this.setEventName}
                  eventDescription={this.state.data.eventDescription}
                  setEventDescription={this.setEventDescription}
                />
              </Paper>
            </Collapse>
            <Collapse
              direction={isStep3Showing ? 'left' : 'right'}
              in={isStep3Showing}
              timeout={{ enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit>
              <Paper id="step-slide">
                <SetRequirements
                  rules={this.state.data.rules}
                  setRules={this.setRules}
                  requirements={this.state.data.requirements}
                  setRequirement={this.setRequirement}
                  deleteRequirement={this.deleteRequirement}
                  equipments={this.state.data.equipments}
                  setEquipment={this.setEquipment}
                  deleteEquipment={this.deleteEquipment}
                />
              </Paper>
            </Collapse>
            <Collapse
              direction={isStep4Showing ? 'left' : 'right'}
              in={isStep4Showing}
              timeout={{ enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit>
              <Paper id="step-slide">
                <CreateEventLocation
                  initialStartAddress={this.state.initialStartAddress}
                  initialWaypoints={this.state.initialWaypoints}
                  setLocation={this.setLocation}
                  location={this.state.data.location}
                  coordinates={this.state.data.coordinates}
                  waypoints={this.state.data.waypoints}
                  setWaypoint={this.setWaypoint}
                  deleteWaypoint={this.deleteWaypoint}
                />
              </Paper>
            </Collapse>

            <Collapse
              direction={isStep5Showing ? 'left' : 'right'}
              in={isStep5Showing}
              timeout={{ enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit>
              <Paper id="step-slide">
                <SetDateEvent
                  startDate={this.state.data.startDate}
                  setStartDate={this.setStartDate}
                  endDate={this.state.data.endDate}
                  setEndDate={this.setEndDate}>
                  <AmountPicker
                    value={this.state.data.notificationInterval}
                    onNumberSet={this.setNotificationInterval}
                  />
                </SetDateEvent>
              </Paper>
            </Collapse>
            <Collapse
              direction={isStep6Showing ? 'left' : 'right'}
              in={isStep6Showing}
              timeout={{ enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit>
              <Paper id="step-slide">
                <AddPhotosSportingLife
                  media={this.state.data.media}
                  setMedia={this.setMedia}
                  deleteMedia={this.deleteMedia}
                />
              </Paper>
            </Collapse>
          </div>

          <div className="create-event-control-buttons">
            <Button
              disabled={currentStep === 0 ? true : false}
              variant="outlined"
              color="primary"
              onClick={() => this.onPreviousClick('previous')}
              className="event-control-button">
              {t('previous-step')}
            </Button>
            <div className="progress-container">
              <Button
                variant="contained"
                disabled={!isNextButton || this.state.showProgress}
                color="primary"
                onClick={
                  currentStep === steps.length - 1
                    ? this.onFinishClick
                    : this.onNextClick
                }
                className="event-control-button">
                {currentStep === steps.length - 1
                  ? t('finish')
                  : t('next-step')}
              </Button>

              {this.state.showProgress && (
                <CircularProgress size={24} className="progress" />
              )}
            </div>
          </div>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            // style={SuccessSnackBar  }
            style={this.state.isSaved ? SuccessSnackBar : ErrorSnackBar}
            open={this.state.showSnackBar}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">
                {this.state.isSaved
                  ? t('personal-info-saved')
                  : t('personal-info-unsaved')}
              </span>
            }
          />
        </div>
      </Fragment>
    )
  }
}

const ErrorSnackBar = {
  backgroundColor: '#d32f2f',
}

const SuccessSnackBar = {
  backgroundColor: '#43a047',
}

const mapStateToProps = store => {
  return {
    currentLocation: store.system.currentUserLocation.coordinates,
    locale: store.system.locale,
  }
}

export default withTranslation()(connect(mapStateToProps)(CreateEvent))
