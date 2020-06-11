import React, { Component } from 'react'
import BackgroundSlider from 'react-background-slider'

import Select from 'react-select'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import SearchIcon from '@material-ui/icons/Search'

import backgroundImages from '../../config/background-images.json'
import './desktop-search-from.css'

export default class SearchForm extends Component {
  render() {
    const {
      lang: {
        title,
        countryLabel,
        cityLabel,
        sportLabel,
        languageLabel,
        searchButton,
        searchLabel,
      },
      countries,
      cities,
      languages,
      sports,
      selectedCountry,
      selectedCity,
      selectedSport,
      selectedLanguage,
    } = this.props

    return (
      <div className="desktop-search-section">
        <div className="desktop-search-section">
          <div className="desktop-background-holder">
            <BackgroundSlider
              images={backgroundImages}
              duration={15}
              transition={2}
            />
          </div>
          <div className="desktop-main-search">
            <form className="main-search-form">
              <h2>{title}</h2>
              <div className="main-form-input-main-holder">
                <div className="form-input-holder-small">
                  <div className="main-form-input-holder">
                    <label>{countryLabel}</label>
                    <Select
                      inputId="react-select-single"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      TextFieldProps={{
                        label: { countryLabel },
                        InputLabelProps: {
                          htmlFor: 'react-select-single',
                          shrink: true,
                        },
                        placeholder: 'Search a country (start with a)',
                      }}
                      // if countries length !== 0 || we fill up file with options
                      options={this.props.getOptionsFrom(countries)}
                      value={this.props.getValueFrom(selectedCountry)}
                      onChange={this.props.onCountrySelect}
                      onInputChange={this.props.onCountryInputChange}
                    />
                  </div>
                  <div className="main-form-input-holder">
                    <label>{cityLabel}</label>
                    <Select
                      inputId="react-select-single"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      TextFieldProps={{
                        label: { cityLabel },
                        InputLabelProps: {
                          htmlFor: 'react-select-single',
                          shrink: true,
                        },
                        placeholder: 'Search a city (start with a)',
                      }}
                      options={this.props.getOptionsFrom(cities)}
                      value={this.props.getValueFrom(selectedCity)}
                      onChange={this.props.onCitySelect}
                      onInputChange={this.props.onCityInputChange}
                    />
                  </div>
                  <div className="main-form-input-holder">
                    <label>{sportLabel}</label>
                    <Select
                      inputId="react-select-single"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      TextFieldProps={{
                        label: { sportLabel },
                        InputLabelProps: {
                          htmlFor: 'react-select-single',
                          shrink: true,
                        },
                        placeholder: 'Search a sport (start with a)',
                      }}
                      options={this.props.getOptionsFrom(sports)}
                      value={this.props.getValueFrom(selectedSport)}
                      onChange={this.props.onSportSelect}
                      onInputChange={this.props.onSportTypeInputChange}
                    />
                  </div>
                  <div className="main-form-input-holder">
                    <label>{languageLabel}</label>
                    <Select
                      inputId="react-select-single"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      TextFieldProps={{
                        label: { languageLabel },
                        InputLabelProps: {
                          htmlFor: 'react-select-single',
                          shrink: true,
                        },
                        placeholder: 'Search a country (start with a)',
                      }}
                      options={this.props.getOptionsFrom(languages)}
                      value={this.props.getValueFrom(selectedLanguage)}
                      onChange={this.props.onLanguageSelect}
                      onInputChange={this.props.onLanguageInputChange}
                    />
                  </div>
                </div>
                <div className="form-input-holder-big">
                  <div className="main-form-input-holder input-long">
                    <TextField
                      id="outlined-name"
                      label={searchLabel}
                      margin="normal"
                      variant="outlined"
                      onChange={this.props.onQueryChange}
                    />
                  </div>
                  <div className="main-form-input-holder input-btn">
                    <Button
                      variant="contained"
                      onClick={this.props.onClickSubmit}>
                      <SearchIcon />
                      {searchButton}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
// they check out if props are correctly shown and work.
SearchForm.propTypes = {
  setCountry: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setSport: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
}
