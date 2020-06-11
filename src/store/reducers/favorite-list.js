import {
  DOWNLOAD_FAVORITE_LIST,
  UPDATE_FAVORITE_USERS_LIST,
  UPDATE_FAVORITE_EVENTS_LIST,
} from '../actions/favorite-list'

export const FavoriteListItemTypes = {
  EVENT: 0,
  USER: 1,
}

const initState = {
  favoriteUsers: [],
  favoriteEvents: [],
}

export function favoriteListReducer(state = initState, action) {
  switch (action.type) {
    case DOWNLOAD_FAVORITE_LIST:
      return { ...state, ...action.payload }
    case UPDATE_FAVORITE_USERS_LIST:
      return { ...state, ...action.payload }
    case UPDATE_FAVORITE_EVENTS_LIST:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
