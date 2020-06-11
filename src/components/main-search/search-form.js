import React, { Component, Fragment } from 'react'

import { withTranslation } from 'react-i18next'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth/withWidth'

import PropTypes from 'prop-types'

import MobileSearchForm from './mobile-search-form'
import DesktopSearchForm from './desktop-search-form'

class SearchForm extends Component {
  getOptionsFrom = options => {
    return options !== undefined && options.length !== 0
      ? options.map(option => ({
          value: option,
          label: option.name,
        }))
      : options
  }

  getValueFrom = (value = 'null') => {
    return value.name
      ? {
          value: value,
          label: value.name,
        }
      : null
  }

  onCountrySelect = item => {
    this.props.setCountry(item.value)
  }

  onCitySelect = item => {
    this.props.setCity(item.value)
  }

  onSportSelect = item => {
    this.props.setSport(item.value)
  }

  onLanguageSelect = item => {
    this.props.setLanguage(item.value)
  }

  onCountryInputChange = (text, action) => {
    this.props.findCountryByNameCoincidence({
      sample: text,
      locale: this.props.systemData.locale,
    })

    return text
  }

  onCityInputChange = (text, action) => {
    this.props.findCitiesByNameCoincidence({
      countryId: this.props.selectedCountry.id,
      sample: text,
      locale: this.props.systemData.locale,
    })
    return text
  }

  onSportTypeInputChange = (text, action) => {
    this.props.findSportType({
      sample: text,
      locale: this.props.systemData.locale,
    })
    return text
  }

  onLanguageInputChange = (text, action) => {
    this.props.findLanguageByNameCoincidence({
      sample: text,
      locale: this.props.systemData.locale,
    })
    return text
  }

  onQueryChange = event => {
    this.props.setSearchQuery(event.target.value)
  }

  onClickSubmit = event => {
    const params = {
      countryId: this.props.selectedCountry.id,
      cityId: this.props.selectedCity.id,
      sportTypeId:
        this.props.selectedSport.id === undefined
          ? -1
          : this.props.selectedSport.id,
      languageId: this.props.selectedLanguage.id,
      searchQuery: this.props.searchQuery,
      locale: this.props.locale,
      ip: this.props.systemData.ip,
    }

    this.props.onClickSearch(params)
  }

  render() {
    const {
      countries,
      cities,
      languages,
      sports,
      selectedCountry,
      selectedCity,
      selectedSport,
      selectedLanguage,
      width,
    } = this.props

    if (cities.length === 1 && selectedCity === undefined)
      this.props.setCity(cities[0])

    if (sports.length === 1 && selectedSport.name === undefined)
      this.props.setSport(sports[0])

    if (countries.length === 1 && selectedCountry.name === undefined)
      this.props.setCountry(countries[0])

    if (languages.length === 1 && selectedLanguage.name === undefined)
      this.props.setLanguage(languages[0])

    return (
      <Fragment>
        {isWidthDown('xs', width) ? (
          <MobileSearchForm
            getOptionsFrom={this.getOptionsFrom}
            getValueFrom={this.getValueFrom}
            onCountrySelect={this.onCountrySelect}
            onCitySelect={this.onCitySelect}
            onSportSelect={this.onSportSelect}
            onLanguageSelect={this.onLanguageSelect}
            onQueryChange={this.onQueryChange}
            onClickSubmit={this.onClickSubmit}
            onCountryInputChange={this.onCountryInputChange}
            onCityInputChange={this.onCityInputChange}
            onSportTypeInputChange={this.onSportTypeInputChange}
            onLanguageInputChange={this.onLanguageInputChange}
            {...this.props}
          />
        ) : (
          <DesktopSearchForm
            getOptionsFrom={this.getOptionsFrom}
            getValueFrom={this.getValueFrom}
            onCountrySelect={this.onCountrySelect}
            onCitySelect={this.onCitySelect}
            onSportSelect={this.onSportSelect}
            onLanguageSelect={this.onLanguageSelect}
            onQueryChange={this.onQueryChange}
            onClickSubmit={this.onClickSubmit}
            onCountryInputChange={this.onCountryInputChange}
            onCityInputChange={this.onCityInputChange}
            onSportTypeInputChange={this.onSportTypeInputChange}
            onLanguageInputChange={this.onLanguageInputChange}
            {...this.props}
          />
        )}
      </Fragment>
    )
  }
}

SearchForm.propTypes = {
  setCountry: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setSport: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
}

export default withWidth()(withTranslation()(SearchForm))
