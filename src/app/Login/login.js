import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { login } from '../../utils/api/auth'
import { isEmail } from 'validator'

import {
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  Button,
  FormControlLabel,
  Divider,
  LinearProgress,
  Fade,
  InputLabel,
} from '@material-ui/core'

import { Visibility, VisibilityOff } from '@material-ui/icons'

import { getKeyUserData, getDefaultAvatarImage } from '../../utils/api/user'
import { getImageData } from '../../utils/api/media'
import { setUserData } from '../../store/actions/user'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enteredEmail: '',
      enteredPassword: '',
      checkbox: false,
      showPassword: false,
      error: {
        isError: false,
        userNotFound: false,
        passwordIsIncorrect: false,
        message: '',
        emailValid: false,
        isPassworsValid: false,
      },
      loading: false,
      isFormValid: false,
    }
  }

  openRegistrationPage = () => {
    this.props.history.push(`/registration`, {})
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  //form of the password, it changes its behaviour
  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  checked = () => {
    this.setState({ checkbox: !this.state.checkbox }, () => {
      this.validateForm()
    })
  }

  onEmailChange = event => {
    let isValid = isEmail(event.target.value)
    this.setState(
      {
        enteredEmail: event.target.value,
        error: {
          isError: false,
          userNotFound: false,
          passwordIsIncorrect: false,
          message: '',
          emailValid: !isValid,
        },
      },
      () => {
        this.validateForm()
      }
    )
  }

  onPasswordChange = event => {
    let passwordValid = event.target.value && event.target.value.length > 4
    this.setState(
      {
        enteredPassword: event.target.value,
        error: {
          isError: false,
          userNotFound: false,
          passwordIsIncorrect: !passwordValid,
          message: '',
          // isPassworsValid:passwordValid
        },
      },
      () => {
        this.validateForm()
      }
    )
  }

  validateForm = () => {
    const { enteredEmail, enteredPassword } = this.state
    if (enteredEmail && enteredPassword) {
      this.setState({
        isFormValid: true,
      })
    } else {
      this.setState({
        isFormValid: false,
      })
    }
  }

  downloadInitializeData = async () => {
    const { locale, setUserData } = this.props
    const userDataPromise = getKeyUserData(locale.value)

    const userResponse = await userDataPromise

    if (userResponse.status === 200) {
      const user = userResponse.payload
      const avatarPhoto = await getImageData(user.avatarImageId, locale.value)

      const data = {
        registered: true,
        id: user.id,
        authUserId: user.authUserId,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarPhotoUrl: avatarPhoto
          ? avatarPhoto.url
          : getDefaultAvatarImage(user.gender),
      }
      setUserData(data)
    } else {
      const data = {
        registered: false,
      }
      setUserData(data)
    }
  }

  onClickChange = async action => {
    this.setState({ loading: true })
    const result = await login(
      this.state.enteredEmail,
      this.state.enteredPassword
    )

    switch (result.type) {
      case 'response':
        this.downloadInitializeData()
        this.props.history.push(`/`, {})
        break
      case 'error':
        if (result.payload === 401) {
          this.setState({
            error: {
              isError: true,
              userNotFound: false,
              //  passwordIsIncorrect: true,
              message: this.props.t('login-page').errors
                .Emailorpasswordisincorrect,
            },
            loading: false,
          })
        } else if (result.payload === 404) {
          this.setState({
            error: {
              isError: true,
              userNotFound: true,
              // passwordIsIncorrect: true,
              message: this.props.t('login-page').errors.usernotfound,
            },
            loading: false,
          })
        } else if (result.payload === 400) {
          this.setState({
            error: {
              isError: true,
              userNotFound: true,
              // passwordIsIncorrect: true,
              message: this.props.t('login-page').errors
                .Emailorpasswordisincorrect,
            },
            loading: false,
          })
        }

        break
      default:
    }
  }

  render() {
    const {
      error: { isError, passwordIsIncorrect, message, emailValid },
      isFormValid,
      loading,
    } = this.state

    const { title, labels, links, buttons } = this.props.t('login-page')

    return (
      <div className="login-page">
        <div className="login-form-container">
          <Fade in={loading} timeout={{ enter: 100, exit: 200 }} unmountOnExit>
            <LinearProgress color="primary" />
          </Fade>
          <form>
            <h3>{title}</h3>
            <TextField
              id="login-email-input"
              label={labels.email}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={this.state.enteredEmail}
              error={emailValid}
              onChange={this.onEmailChange}
            />

            <TextField
              id="login-password-input"
              variant="outlined"
              type={this.state.showPassword ? 'text' : 'password'} //taken from registration.js*/ }
              label={labels.password}
              value={this.state.enteredPassword}
              onChange={this.onPasswordChange}
              error={passwordIsIncorrect}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}>
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {isError ? (
              <InputLabel style={{ margin: '12px 0 0 0' }} error={true}>
                {message}
              </InputLabel>
            ) : null}

            <div className="remember-me">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkbox}
                    onChange={this.checked}
                    value="checkedB"
                    color="primary"
                  />
                }
                label={labels.rememberMe}
              />
              <a href="/">{links.passwordRecovering}</a>
            </div>

            <Divider className="divider" />

            <Button
              className="login-button"
              variant="contained"
              color="primary"
              disabled={!isFormValid}
              onClick={this.onClickChange}>
              {buttons.login}
            </Button>

            <div className="create-account-container">
              <p>{links.register}</p>
              <Button
                onClick={this.openRegistrationPage}
                variant="outlined"
                color="primary">
                {buttons.register}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    system: state.system,
    tokens: state.authentication,
    locale: state.system.locale,
  }
}

const mapDispatchToProps = dispatch => ({
  setUserData: data => dispatch(setUserData(data)),
})

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Login)
)
