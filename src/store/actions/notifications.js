import { DOWNLOAD_UNAPPROVED_PARTICIPANTS } from '../reducers/notifications'
import {
  getUnapprovedParticipant,
  // approveEventParticipant,
  // discardEventParticipant,
  // deleteEventParticipant,
  getMyEvents,
} from '../../utils/api/sport-event'

export const downloadUnapprovedParticipants = (
  userId,
  locale
) => async dispatch => {
  const events = await getMyEvents(userId, locale)

  const res = await Promise.all(
    events.map(async event => {
      const res = await getUnapprovedParticipant(event.id, locale)
      return res.payload
    })
  )

  const arr = []
  res.forEach(item => arr.push(...item))

  dispatch({ type: DOWNLOAD_UNAPPROVED_PARTICIPANTS, payload: arr })
}
