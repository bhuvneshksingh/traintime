import { combineReducers } from 'redux'
import { favoriteListReducer } from './favorite-list'

import { systemReducer } from './system'
import { userReducer } from './user'
import { homeDataReducer } from './home-data'
import { authenticationReducer } from './auth'
import { recomendedUsers } from './recomended-users'
import { recomendedEvents } from './recomended-events'
import { notifications } from './notifications'

export const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  homeData: homeDataReducer,
  auth: authenticationReducer,
  favoriteList: favoriteListReducer,
  recomendedUsers: recomendedUsers,
  recomendedEvents: recomendedEvents,
  notifications: notifications,
})
