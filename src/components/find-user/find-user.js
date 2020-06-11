import React, { Component } from 'react'

import { withTranslation } from 'react-i18next'

import EventBanner from '../section-banner'
import NotFoundBanner from '../not-found-banner'
import Slider from '../../components/slider'
import UserCard from '../user-card'

class FindUser extends Component {
  constructor(props) {
    super(props)
    this.state = { findUserSearchQuery: '' }
  }

  onFindUserInputChange = event => {
    this.setState({ findUserSearchQuery: event.target.value })
  }

  onClickSubmit = event => {
    const params = {
      countryId: this.props.selectedCountry.id,
      cityId: this.props.selectedCity.id,
      sportTypeId:
        this.props.selectedSport.id === undefined
          ? -1
          : this.props.selectedSport.id,
      languageId: this.props.selectedLanguage.id,
      searchQuery: this.state.findUserSearchQuery,
      locale: this.props.systemData.locale,
      ip: this.props.systemData.ip,
    }
    this.props.onFindUserSearch(params)
  }

  addUserToFavoriteList = (user, userKey) => {
    // this.props.addToFavoriteList(user, type:  )
  }

  render() {
    const { t, users, selectedCity } = this.props
    return (
      <div className="find-user-holder">
        {/* <div className="text-field-button">
           <TextField
            className="find-user-element"
            id="outlined-name"
            label={t('find-users')}
            margin="normal"
            variant="outlined"
          /> 
          <IconButton onClick={this.onClickSubmit} aria-label="search">
            <SearchIcon />
          </IconButton> 
        </div>*/}
        <EventBanner
          title={
            selectedCity && selectedCity.name !== undefined
              ? t('users-banner-title')
              : 'Find users in your city'
          }
          city={selectedCity && selectedCity.name}
        />
        {users.length === 0 ? (
          <NotFoundBanner title={t('events-not-found')} />
        ) : (
          <Slider>
            {users.map((user, index) => (
              <UserCard
                key={45}
                myData={index}
                addUserToFavoriteList={this.addUserToFavoriteList}
                data={user}
              />
            ))}
          </Slider>
        )}
      </div>
    )
  }
}

export default withTranslation()(FindUser)
