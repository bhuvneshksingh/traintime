import { findEventsByParams } from '../../utils/api/home-data'
import {
  findCountryByAlpha2,
  findCityByNameMatching,
} from '../../utils/api/country'
import { findLanguageByAlpha2 } from '../../utils/api/language'

export const RECOMENDED_EVENTS_DOWNLOADED = 'RECOMENDED_EVENTS_DOWNLOADED'

export const downloadRecomendedEvents = (params, locale) => async dispatch => {
  const countryPromise = findCountryByAlpha2(params.country.alpha2, locale)
  const cityPromise = findCityByNameMatching(params.city.name, locale)
  const languagePromise = findLanguageByAlpha2(params.language.value, locale)

  const country = await countryPromise
  const city = await cityPromise
  const language = await languagePromise

  const events = await findEventsByParams(
    {
      countryId: country.id,
      cityId: city.id,
      languageId: language.id,
    },
    locale
  )

  dispatch({
    type: RECOMENDED_EVENTS_DOWNLOADED,
    payload: events,
  })
}
