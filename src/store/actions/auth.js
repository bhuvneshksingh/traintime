import { getToken } from '../../utils/api/auth'

export const SET_TOKENS = 'SET_TOKENS'
export const LOGOUT = 'LOGOUT'
export const LOAD_TOKENS = 'LOAD_TOKENS'

export function setAuthentication(data) {
  return {
    type: SET_TOKENS,
    payload: data,
  }
}

export const loadTokens = () => async dispatch => {
  const accessToken = await getToken()
  accessToken !== null
    ? dispatch({
        type: LOAD_TOKENS,
        payload: { isUserIn: true, accessToken, refreshToken: '' },
      })
    : dispatch({
        type: LOGOUT,
        payload: { isUserIn: false, accessToken: '', refreshToken: '' },
      })
}
