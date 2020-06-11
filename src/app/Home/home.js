import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import PageSection from '../../components/page-section'

import MainSearch from '../../components/main-search'
import FindEvent from '../../components/find-event'
import AccountBanner from '../../components/account-banner'
import FindUser from '../../components/find-user'

import {
  initializeHomePageData,
  findCitiesByNameCoincidence,
  setSelectedCountry,
  setSelectedCity,
  setSelectedSport,
  setSelectedLanguage,
  setDefaultData,
  setUsers,
  setEvents,
  setPlaces,
  setSearchFormData,
  setCountries,
  findSportTypeByNameCoincidence,
  findCountryByNameCoincidence,
  findLanguageByNameCoincidence,
  setSearchQuery,
  setSearchUserQuery,
  onClickSearch,
  onPlaceSearch,
  onFindUserSearch,
  onFindEventSearch,
  setSearchEventQuery,
} from '../../store/actions/home-data'

import { setUserLocation } from '../../store/actions/system'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const {
      initializeHomePageData,
      system: { currentUserLocation, locale },
    } = this.props
    initializeHomePageData({ ...currentUserLocation, locale: locale.value })
  }

  render() {
    const {
      t,
      setCountries,
      setCountry,
      setCity,
      setSport,
      setLanguage,
      findCitiesByNameCoincidence,
      findSportTypeByNameCoincidence,
      findCountryByNameCoincidence,
      findLanguageByNameCoincidence,
      setSearchQuery,
      onClickSearch,
      onFindUserSearch,
      onFindEventSearch,
      setSearchUserQuery,
      setSearchEventQuery,
      data: { searchData, users, events },
      system,
      user,
    } = this.props

    return (
      <div
        style={{
          position: 'relative',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
        }}>
        <div
          style={{
            position: 'relative',
            top: '0',
            left: '0',
            right: '0',
          }}>
          <MainSearch
            lang={t('searchForm')}
            {...searchData}
            systemData={system}
            setCountries={setCountries}
            setCountry={setCountry}
            setCity={setCity}
            setSport={setSport}
            setLanguage={setLanguage}
            findCitiesByNameCoincidence={findCitiesByNameCoincidence}
            findSportType={findSportTypeByNameCoincidence}
            findCountryByNameCoincidence={findCountryByNameCoincidence}
            findLanguageByNameCoincidence={findLanguageByNameCoincidence}
            setSearchQuery={setSearchQuery}
            onClickSearch={onClickSearch}
            setSearchUserQuery={setSearchUserQuery}
            onFindUserSearch={onFindUserSearch}
            setSearchEventQuery={setSearchEventQuery}
            onFindEventSearch={onFindEventSearch}
            locale={this.props.system.locale.value}
          />
        </div>
        {/* <PageSection>
          <FindPlace
            lang={t('findPlace')}
            places={places}
            banner={placesBanner}
            {...searchData}
            onPlaceSearch={onPlaceSearch}
            systemData={system}
          />
        </PageSection> */}

        <PageSection>
          <FindUser
            {...searchData}
            history={this.props.history}
            users={users}
            onFindUserSearch={onFindUserSearch}
            addToFavoriteList={this.props.addToFavoriteList}
            systemData={system}
          />
        </PageSection>
        <PageSection unmount={user.registered}>
          <AccountBanner {...t('homeAccountBanner')} />
        </PageSection>

        <PageSection>
          <FindEvent
            {...searchData}
            events={events}
            history={this.props.history}
            onFindEventSearch={onFindEventSearch}
            addToFavoriteList={this.props.addToFavoriteList}
            systemData={system}
          />
        </PageSection>
        <PageSection unmount={user.registered}>
          <AccountBanner {...t('homeEventBanner')} />
        </PageSection>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { system: state.system, data: state.homeData, user: state.user }
}

const mapDispatchToProps = dispatch => ({
  initializeHomePageData: data => dispatch(initializeHomePageData(data)),
  findCitiesByNameCoincidence: sample =>
    dispatch(findCitiesByNameCoincidence(sample)),
  setDefaultData: data => dispatch(setDefaultData(data)),
  setUserLocation: location => dispatch(setUserLocation(location)),
  setCountry: country => dispatch(setSelectedCountry(country)),
  setCity: city => dispatch(setSelectedCity(city)),
  setSport: sport => dispatch(setSelectedSport(sport)),
  setLanguage: language => dispatch(setSelectedLanguage(language)),
  setUsers: users => dispatch(setUsers(users)),
  setEvents: events => dispatch(setEvents(events)),
  setPlaces: places => dispatch(setPlaces(places)),
  setInitialState: initialState => dispatch(setSearchFormData(initialState)),
  setCountries: countries => dispatch(setCountries(countries)),
  findSportTypeByNameCoincidence: data =>
    dispatch(findSportTypeByNameCoincidence(data)),
  findCountryByNameCoincidence: data =>
    dispatch(findCountryByNameCoincidence(data)),
  findLanguageByNameCoincidence: data =>
    dispatch(findLanguageByNameCoincidence(data)),
  setSearchQuery: searchQuery => dispatch(setSearchQuery(searchQuery)),
  onClickSearch: queryText => dispatch(onClickSearch(queryText)),
  onPlaceSearch: params => dispatch(onPlaceSearch(params)),
  onFindUserSearch: params => dispatch(onFindUserSearch(params)),
  setSearchUserQuery: searchQuery =>
    dispatch(setSearchUserQuery(setSearchUserQuery)),
  onFindEventSearch: params => dispatch(onFindEventSearch(params)),
  setSearchEventQuery: searchQuery =>
    dispatch(setSearchEventQuery(setSearchEventQuery)),
})

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Home)
)
