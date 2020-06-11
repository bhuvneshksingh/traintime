import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'

import SectionBanner from '../section-banner'
import Slider from '../../components/slider'
import LocationCard from '../location-card'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'

export default class FindPlace extends Component {
    constructor(props) {
        super(props)
        this.state = { placeSearchQuery: '' }
    }

    handleClickOnCard = (itemId, cardKey) => {
        console.log(`Handle click on card. id: ${itemId} key: ${cardKey}`)
    }

    onPlaceInputChange = event => {
        this.setState({ placeSearchQuery: event.target.value })
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
            searchQuery: this.state.placeSearchQuery,
            locale: this.props.systemData.locale,
            ip: this.props.systemData.ip,
        }
        this.props.onPlaceSearch(params)
    }

    render() {
        const {
            lang: { searchLabel },
            banner,
            places,
        } = this.props
        return (
            <div className="find-place-main-holder">
                <div className="text-field-button">
                    <TextField
                        id="outlined-name"
                        className="find-place-element"
                        label={searchLabel}
                        margin="normal"
                        variant="outlined"
                        onChange={this.onPlaceInputChange}
                    />

                    <IconButton
                        onClick={this.onClickSubmit}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
                <SectionBanner {...banner} />
                <Slider>
                    {/* need to read about this function, this state users  come from user-card, there saved collection of users, which we import fro m datada.set.users */}
                    {Object.entries(places).map((item, i) => (
                        <LocationCard
                            key={i}
                            handleClickOnCard={this.handleClickOnCard}
                            {...item}
                        />
                    ))}
                </Slider>
            </div>
        )
    }
}
