import { logout } from '../../utils/api/auth'

export const SET_USER_DATA = 'SET_USER_DATA'
export const DELETE_USER_DATA = 'DELETE_USER_DATA'

export const setUserData = data => {
  return {
    type: SET_USER_DATA,
    payload: data,
  }
}

export const deleteUserData = () => dispatch => {
  logout()
  dispatch({
    type: DELETE_USER_DATA,
    payload: { registered: false },
  })
}
