import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import Divider from '@material-ui/core/Divider'
// import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

// import AddIcon from '@material-ui/icons/Add'
// import GoogleMapReact from 'google-map-react'

import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {
  geocodeByPlaceId,
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete'

// import CreateEventWaypoint from '../create-event-waypoint'

class CreateEventLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      initValue: '',
      initialAddress: '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { initialAddress } = state
    const {
      initialStartAddress,
      initialWaypoints,
      location: { country, city },
    } = props
    const amountOfSymbols = 3

    if (initialStartAddress !== null) {
    } else if (
      initialAddress.length <= amountOfSymbols &&
      country &&
      country.name &&
      city &&
      city.name
    ) {
      const address = `${city.name}, ${country.name}`
      return {
        initialAddress: address,
      }
    } else {
      return null
    }
  }

  componentDidMount() {
    const { initialAddress } = this.state
    if (initialAddress.length <= 3) {
      this.initStartAddress(initialAddress)
    }
  }

  initStartAddress = async address => {
    const res = await geocodeByAddress(address)
    const location = await this.getLocation(res)
    this.props.setLocation(location)
  }

  setStartAddress = async place => {
    const res = await geocodeByPlaceId(place.place_id)
    const location = await this.getLocation(res)
    this.props.setLocation(location)
  }

  getLocation = async res => {
    const country = await this.extractCountry(res[0].address_components)
    const city = await this.extractCity(res[0].address_components)
    const address = res[0].formatted_address
    const coordinates = await getLatLng(res[0])

    return { country, city, address, coordinates }
  }

  extractCountry = async components => {
    for (const component of components) {
      if (component.types[0] === 'country') {
        return {
          name: component['long_name'],
          alpha2: component['short_name'],
        }
      }
    }
  }

  extractCity = async components => {
    for (const component of components) {
      if (component.types[0] === 'locality') {
        return {
          name: component['long_name'],
        }
      }
    }
  }

  setWaypoint = async waypoint => {
    const res = await geocodeByPlaceId(waypoint.place_id)
    const location = await this.getLocation(res)
    this.props.setWaypoint(location)
    this.setState({ initValue: '' })
  }

  render() {
    const { t } = this.props
    const { initialAddress: location } = this.state

    return (
      <div className="location-container">
        <div className="item">
          <p>{t('where-event-start')}</p>

          <div className="place-input">
            <GooglePlacesAutocomplete
              inputClassName="autocomplete-input"
              onSelect={this.setStartAddress}
              placeholder={t('type-here')}
              required={true}
              initialValue={location}
            />
          </div>
        </div>

        <Divider />
        <div className="item waypoint-item">
          <p>{t('waypoints')}</p>
          {/* <Button variant="outlined" color="primary">
            <AddIcon />
            {t('new-waypoint')}
          </Button> */}
        </div>

        <GooglePlacesAutocomplete
          inputClassName="autocomplete-input"
          onSelect={this.setWaypoint}
          vainitialValue={this.state.initValue}
        />

        <div className="chips">
          {this.props.waypoints.map((item, index) => {
            return (
              <Chip
                className="chip"
                color="primary"
                variant="outlined"
                onDelete={this.props.deleteWaypoint.bind(this, index)}
                key={index}
                label={item.address}
              />
            )
          })}
        </div>

        {/* <Divider /> */}
        {/* <div className="map-container">
          <p>{t('see-on-map')}</p>
          <div className="event-map">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyAJbckjrDMtdIyp0H9fmMgq9iL_vjCEw8E',
              }}
              center={{
                lat: coordinates.lat,
                lng: coordinates.lon,
              }}
              defaultZoom={11}
            />
          </div>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.system.currentUserLocation,
  }
}

export default connect(mapStateToProps)(withTranslation()(CreateEventLocation))
