import {
  addUserToFavorite,
  addEventToFavorite,
  getFavoriteUsers,
  getFavoriteEvents,
  deleteEventFromFavorite,
  deleteUserFromFavorite,
} from '../../utils/api/user'

export const DOWNLOAD_FAVORITE_LIST = 'DOWNLOAD_FAVORITE_LIST'

export const UPDATE_FAVORITE_USERS_LIST = 'UPDATE_FAVORITE_USERS_LIST'
export const UPDATE_FAVORITE_EVENTS_LIST = 'UPDATE_FAVORITE_EVENTS_LIST'

export const downloadFavoriteList = (userId, locale) => async dispatch => {
  const favoriteUsersPromise = getFavoriteUsers(userId, locale)
  const favoriteEventsPromise = getFavoriteEvents(userId, locale)

  const favoriteUsersResult = await favoriteUsersPromise
  const favoriteEventsResult = await favoriteEventsPromise

  const payload = { favoriteUsers: [], favoriteEvents: [] }

  if (favoriteEventsResult.status === 200)
    payload.favoriteEvents = favoriteEventsResult.data

  if (favoriteUsersResult.status === 200)
    payload.favoriteUsers = favoriteUsersResult.data

  dispatch({
    type: DOWNLOAD_FAVORITE_LIST,
    payload,
  })
}

/**
 * @param {number} profileId - id of user (registered in the system rigth now)
 * @param {number} userId - id of user which will be added in favorite list
 * @param {string} locale - locale of the system
 */
export const addUserToFavoriteList = (
  profileId,
  userId,
  locale
) => async dispatch => {
  const status = await addUserToFavorite(profileId, userId, locale)

  if (status === 200) {
    const response = await getFavoriteUsers(profileId, locale)

    if (response.status === 200)
      dispatch({
        type: UPDATE_FAVORITE_USERS_LIST,
        payload: {
          favoriteUsers: response.data,
        },
      })
  }
}

/**
 * @param {number} profileId - id of user (registered in the system rigth now)
 * @param {number} userId - id of user which will be added in favorite list
 * @param {string} locale - locale of the system
 */
export const addEventToFavoriteList = (
  profileId,
  userId,
  locale
) => async dispatch => {
  const status = await addEventToFavorite(profileId, userId, locale)

  if (status === 200) {
    const response = await getFavoriteEvents(profileId, locale)

    if (response.status === 200)
      dispatch({
        type: UPDATE_FAVORITE_USERS_LIST,
        payload: {
          favoriteEvents: response.data,
        },
      })
  }
}

/**
 * @param {number} profileId - id of user (registered in the system rigth now)
 * @param {number} userId - id of user which will be added in favorite list
 * @param {string} locale - locale of the system
 */
export const deleteEventFromFavoriteList = (
  profileId,
  userId,
  locale
) => async dispatch => {
  const status = await deleteEventFromFavorite(profileId, userId, locale)

  if (status === 200) {
    const response = await getFavoriteEvents(profileId, locale)

    if (response.status === 200)
      dispatch({
        type: UPDATE_FAVORITE_USERS_LIST,
        payload: {
          favoriteEvents: response.data,
        },
      })
  }
}

/**
 * @param {number} profileId - id of user (registered in the system rigth now)
 * @param {number} userId - id of user which will be added in favorite list
 * @param {string} locale - locale of the system
 */
export const deleteUserFromFavoriteList = (
  profileId,
  userId,
  locale
) => async dispatch => {
  const status = await deleteUserFromFavorite(profileId, userId, locale)

  if (status === 200) {
    const response = await getFavoriteUsers(profileId, locale)

    if (response.status === 200)
      dispatch({
        type: UPDATE_FAVORITE_USERS_LIST,
        payload: {
          favoriteUsers: response.data,
        },
      })
  }
}
