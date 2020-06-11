import {
  getInitSearchFormData,
  findUserByParams,
  findEventsByParams,
  findPlaces,
} from '../../utils/api/home-data'

import {
  findCityByNameMatching,
  findCountryByNameMatching,
} from '../../utils/api/country'
import { sportTypesFindByMatching } from '../../utils/api/sport-type'
import { findLanguageByNameMatching } from '../../utils/api/language'

export const INITIALIZE_HOME_DATA = 'INITIALIZE_HOME_DATA'

export const FIND_COUNTRIES_BY_NAME_COINCIDENCE =
  'FIND_COUNTRIES_BY_NAME_COINCIDENCE'
export const FIND_CITIES_BY_NAME_COINCIDENCE = 'FIND_CITIES_BY_NAME_COINCIDENCE'
export const FIND_SPORT_TYPES_BY_NAME_COINCIDENCE =
  'FIND_SPORT_BY_TYPES_BY_NAME_COINCIDENCE'
export const FIND_COUNTRY_BY_NAME_COINCIDENCE =
  'FIND_COUNTRY_BY_NAME_COINCIDENCE'
export const FIND_LANGUAGE_BY_NAME_COINCIDENCE =
  'FIND_LANGUAGE_BY_NAME_COINCIDENCE'

export const SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY'
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY'
export const SET_SELECTED_SPORT = 'SET_SELECTED_SPORT'
export const SET_SELECTED_LANGUAGE = 'SET_SELECTED_LANGUAGE'
export const SET_DEFAULT_DATA = 'SET_DEFAULT_DATA'
export const SET_USERS = 'SET_USERS'
export const SET_EVENTS = 'SET_EVENTS'
export const SET_PLACES = 'SET_PLACES'
export const SET_STATE = 'SET_STATE'
export const SET_COUNTRIES = 'SET_COUNTRIES'
export const SET_LANGAUGES = 'SET_LANGUAGES'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const ON_SEARCH_CLICK = 'ON_SEARCH_CLICK'
export const ON_PLACE_SEARCH = 'ON_PLACE_SEARCH'
export const ON_FIND_USER_SEARCH = 'ON_FIND_USER_SEARCH'
export const ON_FIND_EVENT_SEARCH = 'ON_FIND_EVENT_SEARCH'
export const SET_SEARCH_USER_QUERY = 'SET_SEARCH_USER_QUERY'
export const SET_SEARCH_EVENT_QUERY = 'SET_SEARCH_EVENT_QUERY'

export const initializeHomePageData = data => async dispatch => {
  const { country, city, ip, locale } = data

  const searchFormData = await getInitSearchFormData(
    country.alpha2,
    city.name,
    locale
  )

  const params = {
    countryId: searchFormData.selectedCountry.id,
    cityId: null,
    // cityId: searchFormData.selectedCity.id,
    sportTypeId:
      searchFormData.selectedSport.id === undefined
        ? -1
        : searchFormData.selectedSport.id,
    languageId: searchFormData.selectedLanguage.id,
    searchQuery: '',
    locale,
    ip,
  }

  const usersPromise = findUserByParams(params, locale)
  const eventsPromise = findEventsByParams(params, locale)
  //   const places = await findPlaces(params, locale)

  dispatch({
    type: INITIALIZE_HOME_DATA,
    payload: {
      events: await eventsPromise,
      searchData: searchFormData,
      users: await usersPromise,
    },
  })
}

export const onPlaceSearch = (params, locale) => async dispatch => {
  const places = await findPlaces(params, locale)
  dispatch({
    type: ON_PLACE_SEARCH,
    payload: places,
  })
}

export const onFindUserSearch = (params, locale) => async dispatch => {
  const users = await findUserByParams(params, locale)
  dispatch({
    type: ON_FIND_USER_SEARCH,
    payload: users,
  })
}

export const onFindEventSearch = (params, locale) => async dispatch => {
  const events = await findEventsByParams(params, locale)
  dispatch({
    type: ON_FIND_EVENT_SEARCH,
    payload: events,
  })
}

export const setSearchQuery = queryText => {
  return {
    type: SET_SEARCH_QUERY,
    payload: queryText,
  }
}

export const setSearchUserQuery = queryText => {
  return {
    type: SET_SEARCH_USER_QUERY,
    payload: queryText,
  }
}
export const setSearchEventQuery = queryText => {
  return {
    type: SET_SEARCH_EVENT_QUERY,
    payload: queryText,
  }
}

// we need to trasfer data from object data from search form, find sportType by name matching from folder api
export const findCitiesByNameCoincidence = data => async dispatch => {
  const { countryId, sample, locale } = data

  if (sample.split('').length > 3) {
    const cities = await findCityByNameMatching(countryId, sample, locale.value)

    if (cities.length !== 0) {
      dispatch({
        type: FIND_CITIES_BY_NAME_COINCIDENCE,
        payload: { cities },
      })
    }
  }
}
// I CALL UP FUNCTION THAT I OVERTAKEN FROM SPORT-TYPE.JS, AND IMPORTED HERE ABOVE. , NEED TO REWRITEN IF FUNCTION TOO. THAN REDUCER, async function is findSportByTypebynaNameCoincidence
// SportTypesFindByMatching its function related to postman, api helper backend data.
export const findSportTypeByNameCoincidence = data => async dispatch => {
  const { sample, locale } = data

  if (sample.split('').length > 2) {
    const sports = await sportTypesFindByMatching(sample, locale.value)

    if (sports.length !== 0) {
      dispatch({
        type: FIND_SPORT_TYPES_BY_NAME_COINCIDENCE,
        payload: { sports },
      })
    }
  }
}

export const findCountryByNameCoincidence = data => async dispatch => {
  const { sample, locale } = data

  if (sample.split('').length > 2) {
    console.log('findCountryByNameCoincidence')

    const countries = await findCountryByNameMatching(sample, locale.value)
    console.log('findCountryByNameCoincidence')
    console.log(sample)
    if (countries.length !== 0) {
      console.log('dispatch')
      dispatch({
        type: FIND_COUNTRY_BY_NAME_COINCIDENCE,
        payload: { countries },
      })
    }
  }
}

export const findLanguageByNameCoincidence = data => async dispatch => {
  const { sample, locale } = data
  if (sample.split('').length > 1) {
    const languages = await findLanguageByNameMatching(sample, locale.value)
    if (languages.length !== 0) {
      dispatch({
        type: FIND_LANGUAGE_BY_NAME_COINCIDENCE,
        payload: { languages },
      })
    }
  }
}
// const homeDataApi = new HomeData(locale.value)work with the server and send information
export const onClickSearch = params => async dispatch => {
  console.log('On search click')
  console.log(params)
  const usersPromise = findUserByParams(params, params.locale)
  const eventsPromise = findEventsByParams(params, params.locale)
  // const places = await findPlaces(params, locale)

  dispatch({
    type: ON_SEARCH_CLICK,
    payload: {
      users: await usersPromise,
      events: await eventsPromise,
    },
  })
}

// syncronious functions
export function setCountries(countries) {
  return {
    type: SET_COUNTRIES,
    payload: countries,
  }
}

export function setSelectedCountry(country) {
  return {
    type: SET_SELECTED_COUNTRY,
    payload: country,
  }
}

export function setSelectedCity(city) {
  return {
    type: SET_SELECTED_CITY,
    payload: city,
  }
}

export function setSelectedSport(sport) {
  return {
    type: SET_SELECTED_SPORT,
    payload: sport,
  }
}

export function setSelectedLanguage(language) {
  return {
    type: SET_SELECTED_LANGUAGE,
    payload: language,
  }
}

export function setDefaultData(data) {
  return {
    type: SET_DEFAULT_DATA,
    payload: data,
  }
}

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users,
  }
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    payload: events,
  }
}

export function setPlaces(places) {
  return {
    type: SET_PLACES,
    payload: places,
  }
}

export function setSearchFormData(state) {
  return {
    type: SET_STATE,
    payload: state,
  }
}
