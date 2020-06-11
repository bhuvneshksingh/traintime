export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'
export const SET_SYSTEM_LOCALE = 'SET_SYSTEM_LOCALE'

export function setCurrentLocation(payload) {
  return {
    type: SET_CURRENT_LOCATION,
    payload,
  }
}

export function setUserLocation(location) {
  return {
    type: SET_CURRENT_LOCATION,
    payload: location,
  }
}

export function setSystemLocale(locale) {
  return {
    type: SET_SYSTEM_LOCALE,
    payload: locale,
  }
}
