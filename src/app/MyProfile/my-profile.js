import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  getAvatarUrl,
  getCoverUrl,
  getAboutUser,
  saveAboutUser,
  getUserInterests,
  saveUserInterests,
  updateAvatar,
  updateCover,
  getDefaultAvatarImage,
} from '../../utils/api/user'
import {
  findCityByNameMatching,
  findCountryByNameMatching,
} from '../../utils/api/country'

import TextField from '@material-ui/core/TextField'
import PageContainer from '../../components/page-container'
import PageSection from '../../components/page-section'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import PageEditItem from '../../components/page-edit-item'

const editTextStyle = { width: '100%', maxWidth: '400px', margin: '8px auto' }

class MyProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatarImageUrl: '',
      avatarImageFile: null,
      coverImageUrl: '',
      coverImageFile: null,
      aboutUser: '',
      aboutUserEdit: false,
      userInterests: '',
      userInterestsEdit: false,
      country: {},
      countries: [],
      city: {},
      cities: [],
    }
  }

  onSaveClick = async type => {
    const {
      avatarImageFile,
      avatarImageUrl,
      coverImageFile,
      aboutUser,
      userInterests,
    } = this.state
    const { i18n, user } = this.props

    switch (type) {
      case 'images':
        if (avatarImageFile !== null) updateAvatar(avatarImageFile, user.id)
        if (coverImageFile !== null) updateCover(coverImageFile, user.id)
        this.setState({ avatarImageFile: null, coverImageFile: null })
        break
      case 'about-user':
        saveAboutUser(aboutUser, i18n.language)
        this.setState(prevState => ({ ...prevState, aboutUserEdit: false }))
        break
      case 'user-interests':
        saveUserInterests(userInterests, i18n.language)
        this.setState(prevState => ({ ...prevState, userInterestsEdit: false }))
        break
      default:
    }
  }

  onCancelClick = type => {
    switch (type) {
      case 'images':
        this.deleteSavedImages()
        break
      case 'about-user':
        this.deleteSavedAboutUser()
        break
      case 'user-interests':
        this.deleteSavedUserInterests()
        break
      default:
    }
  }

  onCoverImageSelect = files => {
    const coverImageUrl = URL.createObjectURL(files[0])
    const coverImageFile = files[0]
    // const coverImageFile = files[0]

    this.setState(prevState => ({
      ...prevState,
      coverImageUrl,
      coverImageFile,
    }))
  }

  onAvatarImageSelect = files => {
    const avatarImageUrl = URL.createObjectURL(files[0])
    const avatarImageFile = files[0]

    this.setState(prevState => ({
      ...prevState,
      avatarImageUrl,
      avatarImageFile,
    }))
  }

  deleteSavedImages = async () => {
    const { user } = this.props

    const avatarImageUrl = await getAvatarUrl(user.id)
    const coverImageUrl = await getCoverUrl(user.id)
    this.setState({
      avatarImageUrl,
      avatarImageFile: null,
      coverImageUrl,
      coverImageFile: null,
    })
  }

  deleteSavedAboutUser = async () => {
    const { user, i18n } = this.props

    const aboutUser = await getAboutUser(user.id, i18n.language)

    this.setState(prevState => ({
      ...prevState,
      aboutUser,
      aboutUserEdit: false,
    }))
  }

  deleteSavedUserInterests = async () => {
    const { user, i18n } = this.props

    const userInterests = await getUserInterests(user.id, i18n.language)

    this.setState(prevState => ({
      ...prevState,
      userInterests,
      userInterestsEdit: false,
    }))
  }

  onCountryInputChange = text => {
    if (text.length > 3) {
    }
  }

  downloadCountries = async text => {
    const { i18n } = this.props

    const countries = await findCountryByNameMatching(text, i18n.language)
    this.setState(prevState => ({ ...prevState, countries }))
  }

  onCityinputChange = async text => {
    const { i18n } = this.props
    const { country } = this.state

    const cities = await findCityByNameMatching(
      country.id,
      text,
      i18n.language.value
    )
    this.setState(prevState => ({ ...prevState, cities }))
  }

  setAvatar = avatarImageUrl => {
    this.setState(prevState => ({
      ...prevState,
      avatarImageUrl,
      avatarImageFile: avatarImageUrl,
    }))
  }

  onClose = () => {
    getDefaultAvatarImage(this.initData)
    this.setState(prevState => ({ ...prevState, avatarImageFile: null }))
  }

  onAboutUserChange = event => {
    const aboutUser = event.target.value
    this.setState(prevState => ({
      ...prevState,
      aboutUser,
      aboutUserEdit: true,
    }))
  }

  onUserInterestsChange = event => {
    const userInterests = event.target.value
    this.setState(prevState => ({
      ...prevState,
      userInterests,
      userInterestsEdit: true,
    }))
  }

  render() {
    const { t } = this.props

    return (
      <PageContainer>
        <Navbar history={this.props.history} position="relative" />
        <PageSection>
          <div className="my-profile">
            <div className="my-profile__images-preview">
              <div className="previews">
                <img
                  className="cover-image"
                  src={this.state.coverImageUrl}
                  alt="User's cover"
                />
                <img
                  className="avatar-image"
                  src={this.state.avatarImageUrl}
                  alt="User's avatar"
                />
              </div>
              {/* <div className="control-buttons">
                <UploadButton
                  multiple={false}
                  id="cover-image"
                  className="upload-button"
                  onFilesSelected={this.onCoverImageSelect}>
                  <CloudUploadOutlinedIcon />
                  {t('upload-cover-image')}
                </UploadButton>
                <Avatar
                  width={320}
                  height={320}
                  imageWidth={320}
                  minCropRadius={60}
                  label={
                    <Button
                      type="file"
                      variant="outlined"
                      color="secondary"
                      raised
                      className="upload-button upload"
                      component="span">
                      <CloudUploadOutlinedIcon />
                      {t('upload-avatar-image')}
                    </Button>
                  }
                  onCrop={this.setAvatar}
                  onClose={this.onClose}
                  img={this.state.avatarImageFile}
                />

                {this.state.avatarImageFile !== null ||
                this.state.coverImageFile !== null ? (
                  <div className="confirmation-buttons">
                    <p>{t('save-changes')}</p>
                    <div>
                      <Button
                        variant="outlined"
                        onClick={() => this.onCancelClick('images')}>
                        {t('cancel')}
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.onSaveClick('images')}>
                        {t('save')}
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div> */}
            </div>
          </div>
        </PageSection>
        <PageSection>
          <PageEditItem
            title={t('about-you')}
            type="about-user"
            showActions={this.state.aboutUserEdit}
            onSave={this.onSaveClick}
            onCancel={this.onCancelClick}>
            <TextField
              id="about-you-input"
              style={editTextStyle}
              label={t('type-here')}
              margin="dense"
              variant="outlined"
              value={this.state.aboutUser}
              onChange={this.onAboutUserChange}
              multiline
              rows={5}
            />
          </PageEditItem>
          <PageEditItem
            title={t('your-interests')}
            type="user-interests"
            showActions={this.state.userInterestsEdit}
            onSave={this.onSaveClick}
            onCancel={this.onCancelClick}>
            <TextField
              id="your-interests-input"
              style={editTextStyle}
              label={t('type-here')}
              margin="dense"
              variant="outlined"
              value={this.state.userInterests}
              onChange={this.onUserInterestsChange}
              multiline
              rows={5}
            />
          </PageEditItem>
          {/* <PageEditItem
            title={t('your-location')}
            type="user-interests"
            onSave={this.onSaveClick}
            onCancel={this.onCancelClick}>
            <TextField
              variant="outlined"
              label={t('country')}
              style={editTextStyle}
              value={this.state.country.name}
            />
            <TextField
              variant="outlined"
              label={t('city')}
              style={editTextStyle}
              value={this.state.city.name}
            />
          </PageEditItem> */}
        </PageSection>
        <Footer />
      </PageContainer>
    )
  }
}

const mapStateToProps = store => {
  return { user: store.user }
}

export default connect(mapStateToProps)(withTranslation()(MyProfilePage))
