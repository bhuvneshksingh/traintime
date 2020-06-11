import React, { Component } from 'react'
import Select from 'react-select'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import BackgroundSlider from 'react-background-slider'
import backgroundImages from '../../config/background-images.json'

import './mobile-search-form.css'

export default class MobileSearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backgroundWidth: 0,
      backgroundHeight: 0,
    }
  }

  componentDidMount() {
    this.setBackgroundSliderSize()
  }

  setBackgroundSliderSize = () => {
    const width = document.querySelector('.background-holder').clientWidth
    const height = (width * 75) / 100

    this.setState({
      backgroundWidth: width,
      backgroundHeight: height,
    })
  }

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
      <div className="mobile-search-container">
        <div
          className="background-holder"
          style={{ height: `${this.state.backgroundHeight}px` }}>
          <BackgroundSlider
            images={backgroundImages}
            duration={10}
            transition={3}
          />

          <div className="background-title-holder">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="mobile-main-search">
          <form className="mobile-main-search-form">
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
                    {searchButton}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
