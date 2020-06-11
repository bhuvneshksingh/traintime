import { RECOMENDED_EVENTS_DOWNLOADED } from '../actions/recomended-events'

const initState = []

export function recomendedEvents(state = initState, action) {
  switch (action.type) {
    case RECOMENDED_EVENTS_DOWNLOADED:
      return [...action.payload]
    default:
      return state
  }
}
