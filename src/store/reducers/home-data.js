import {
  SET_SELECTED_COUNTRY,
  SET_SELECTED_CITY,
  SET_SELECTED_SPORT,
  SET_SELECTED_LANGUAGE,
  SET_DEFAULT_DATA,
  SET_USERS,
  SET_EVENTS,
  SET_PLACES,
  SET_STATE,
  SET_COUNTRIES,
  INITIALIZE_HOME_DATA,
  FIND_CITIES_BY_NAME_COINCIDENCE,
  FIND_SPORT_TYPES_BY_NAME_COINCIDENCE,
  FIND_COUNTRY_BY_NAME_COINCIDENCE,
  FIND_LANGUAGE_BY_NAME_COINCIDENCE,
  SET_SEARCH_QUERY,
  ON_SEARCH_CLICK,
  ON_PLACE_SEARCH,
  ON_FIND_USER_SEARCH,
  ON_FIND_EVENT_SEARCH,
  // SET_SEARCH_USER_QUERY,
  // SET_SEARCH_EVENT_QUERY,
} from '../actions/home-data'
// we save here function to which belongs
const initialState = {
  searchData: {
    countries: [],
    cities: [],
    sports: [],
    languages: [],
    selectedCountry: {},
    selectedCity: {},
    selectedSport: {},
    selectedLanguage: {},
    searchQuery: '',
    onPlaceSearch: '',
    onFindUserSearch: '',
    onFindEventSearch: '',
  },
  usersBanner: {},
  users: [],

  placesBanner: {},
  places: [],

  eventsBanner: {},
  events: [],

  createAccountBanner: {},
  createEventBanner: {},
}

export function homeDataReducer(state = initialState, action) {
  const { searchData } = state

  switch (action.type) {
    case INITIALIZE_HOME_DATA:
      console.log(action.payload)
      return {
        ...state,
        ...action.payload,
      }
    case FIND_CITIES_BY_NAME_COINCIDENCE:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          ...action.payload,
        },
      }
    case FIND_SPORT_TYPES_BY_NAME_COINCIDENCE:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          ...action.payload,
        },
      }
    case FIND_COUNTRY_BY_NAME_COINCIDENCE:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          ...action.payload,
        },
      }
    case FIND_LANGUAGE_BY_NAME_COINCIDENCE:
      return {
        ...state,
        searchData: {
          ...state.searchData,
          ...action.payload,
        },
      }
    case SET_STATE:
      return {
        ...state,
        searchData: action.payload,
      }

    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        searchData: {
          ...searchData,
          selectedCountry: action.payload,
        },
      }
    case SET_SELECTED_CITY:
      return {
        ...state,
        searchData: {
          ...searchData,
          selectedCity: action.payload,
        },
      }
    case SET_SELECTED_SPORT:
      return {
        ...state,
        searchData: {
          ...searchData,
          selectedSport: action.payload,
        },
      }
    case SET_SELECTED_LANGUAGE:
      return {
        ...state,
        searchData: {
          ...searchData,
          selectedLanguage: action.payload,
        },
      }
    case SET_DEFAULT_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      }
    case SET_PLACES:
      return {
        ...state,
        places: action.payload,
      }

    case SET_COUNTRIES:
      return {
        ...state,
        searchData: {
          ...searchData,
          countries: action.payload,
        },
      }
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchData: {
          ...searchData,
          searchQuery: action.payload,
        },
      }
    case ON_SEARCH_CLICK:
      return {
        ...state,
        ...action.payload,
      }
    case ON_PLACE_SEARCH:
      return {
        ...state,
        places: action.payload,
      }
    case ON_FIND_USER_SEARCH:
      return {
        ...state,
        users: action.payload,
      }
    case ON_FIND_EVENT_SEARCH:
      return {
        ...state,
        events: action.payload,
      }
    default:
      return state
  }
}
