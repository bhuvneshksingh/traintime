export const DOWNLOAD_UNAPPROVED_PARTICIPANTS =
  'DOWNLOAD_UNAPPROVED_PARTICIPANTS'

const initState = {
  participants: [],
}

export function notifications(state = initState, action) {
  switch (action.type) {
    case DOWNLOAD_UNAPPROVED_PARTICIPANTS:
      return { ...state, participants: action.payload }
    default:
      return state
  }
}
