import { findUserByParams } from '../../utils/api/home-data'
import {
  findCountryByAlpha2,
  findCityByNameMatching,
} from '../../utils/api/country'
import { findLanguageByAlpha2 } from '../../utils/api/language'

export const RECOMENDED_USERS_DOWNLOADED = 'RECOMENDED_USERS_DOWNLOADED'

export const downloadRecomendedUsers = (params, locale) => async dispatch => {
  const countryPromise = findCountryByAlpha2(params.country.alpha2, locale)
  const cityPromise = findCityByNameMatching(params.city.name, locale)
  const languagePromise = findLanguageByAlpha2(params.language.value, locale)

  const country = await countryPromise
  const city = await cityPromise
  const language = await languagePromise

  const users = await findUserByParams(
    {
      countryId: country.id,
      cityId: city.id,
      languageId: language.id,
    },
    locale
  )

  console.debug('Recomended users', users)
  dispatch({
    type: RECOMENDED_USERS_DOWNLOADED,
    payload: users,
  })
}
