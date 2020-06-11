import { RECOMENDED_USERS_DOWNLOADED } from '../actions/recomended-users'

const initState = []

export function recomendedUsers(state = initState, action) {
  switch (action.type) {
    case RECOMENDED_USERS_DOWNLOADED:
      return [...action.payload]
    default:
      return state
  }
}
