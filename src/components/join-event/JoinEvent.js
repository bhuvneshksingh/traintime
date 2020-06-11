import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
// import { makeStyles } from '@material-ui/core/styles'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import ScheduleIcon from '@material-ui/icons/Schedule'
// import TextField from '@material-ui/core/TextField'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
// import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
// import img from './hiker.jpg'
// import CustomizedSelects from './DropdownComponent'
// import Chip from '@material-ui/core/Chip'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import {
  getEventSimplified,
  addParticipantToEvent,
} from '../../utils/api/sport-event'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { relative } from 'path'
import Snackbar from '@material-ui/core/Snackbar'

class JoinEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      downloadFailed: false,
      loading: false,
      showSnackBar: false,
      isSaved: false,
    }
  }
  // we are taking locale from const on the bottom, by this we are getting entries in
  componentDidMount() {
    const { eventId, locale } = this.props

    getEventSimplified(eventId, locale.value).then(result => {
      if ((result.status = 200)) {
        this.setState({ data: result.payload })
      } else {
        this.setState({ downloadFailed: true })
      }
    })
  }

  handleFinishClick = () => {
    const { userId, eventId, locale } = this.props

    this.setState({ loading: true })
    addParticipantToEvent(userId, eventId, locale).then(status => {
      switch (status) {
        case 201:
          this.setState({ isSaved: true, showSnackBar: true, loading: false })
          setTimeout(() => {
            this.props.onClose()
          }, 2000)

          break
        case 409:
          this.setState({ isSaved: true, showSnackBar: true, loading: false })
          setTimeout(this.props.onClose, 2000)

          break
        default:
          this.setState({ isSaved: false, showSnackBar: true, loading: false })
          setTimeout(this.props.onClose, 2000)
      }
    })
  }

  // i am filtering data from this.state, than in return we remove this.data
  render() {
    const { data, loading } = this.state
    console.log(this.props)

    const { t } = this.props

    return (
      <Dialog
        open={this.props.open}
        maxWidth="lg"
        // open={true}
        className="join-to-event-container"
        aria-labelledby="form-dialog-title">
        {data === null || data === undefined ? (
          <CircularProgress />
        ) : (
          <Fragment>
            <DialogTitle id="form-dialog-title" className="join-to-event">
              Join to event
            </DialogTitle>

            <Divider />
            <DialogContent className="dialog-content">
              <div className="superior-container">
                <div className="card-main-container">
                  <img
                  // src={`${data.eventInfo&&data.eventInfo.coverPhoto}?width=208`}
                  //alt={data.eventInfo&&data.eventInfo.coverPhotoDescription}
                  />
                  <div className="card-joint-event">
                    <h2>{data.eventInfo.name}</h2>

                    <div className="card-icon">
                      <MyLocationIcon />
                      <p>{data.startLocation && data.startLocation.address} </p>
                    </div>
                    <div className="card-icon">
                      <ScheduleIcon />
                      <p>{data.eventInfo && data.eventInfo.startTime}</p>
                    </div>
                  </div>
                  <div className="general-info">
                    <div className="banha-organizer">
                      <Avatar
                        className="avatar"
                        src={data.userInfo && data.userInfo.avatar.url}
                      />
                      <div className="organizer-info">
                        <h3>{data.userInfo.fullName}</h3>
                        <h4>
                          <em>Event's organizer</em>
                        </h4>
                      </div>
                    </div>
                    {/* <div className="joined">
                      <h3> +2 joined</h3>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* <div className="title-container">
                <p>Invite friends</p>

                <Divider />
              </div> */}

              {/* <div className="invited-persons">
                <div className="dropdown-component">
                  <h4>Entry your friend's name or email </h4>

                  <CustomizedSelects
                locale={this.props.locale.value} />
                </div>
                <div className="avatar-person-name-container">
                  <Chip
                    className="chips"
                    avatar={<Avatar alt="Natacha">LB</Avatar>}
                    label="Person name"
                    variant="outlined"
                  />
                  <Chip
                    className="chips"
                    avatar={<Avatar alt="Natacha">IB</Avatar>}
                    label="Person name"
                    variant="outlined"
                  />
                </div>
              </div> */}
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.props.onClose}>
                Cancel
              </Button>

              <div
                className="button-join-event"
                style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={this.handleFinishClick}>
                  Join
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </div>
            </DialogActions>
          </Fragment>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          // style={SuccessSnackBar  }
          open={this.state.showSnackBar}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              {this.state.isSaved
                ? t('join-event-saved')
                : t('join-event-unsaved')}
            </span>
          }
        />
      </Dialog>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
    system: store.system,
    locale: store.system.locale,
    auth: store.auth,
  }
}

const JoinEventWithRedux = connect(mapStateToProps)(JoinEvent)

export default withTranslation()(JoinEventWithRedux)
