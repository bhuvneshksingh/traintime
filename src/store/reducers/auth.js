import { SET_TOKENS, LOGOUT, LOAD_TOKENS } from '../actions/auth'

const initState = {
  isUserIn: false,
  accessToken: '',
  refreshToken: '',
}

export function authenticationReducer(state = initState, action) {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        ...action.payload,
      }
    case LOAD_TOKENS:
      return { ...state, ...action.payload }
    case LOGOUT:
      return {
        ...action.payload,
      }
    default:
      return { ...state }
  }
}
