import React, { Component } from 'react'

import { withTranslation } from 'react-i18next'

// import TextField from '@material-ui/core/TextField'

import NotFoundBanner from '../not-found-banner'
import Slider from '../../components/slider'
import EventCard from '../event-card'
import EventBanner from '../section-banner'
// import SearchIcon from '@material-ui/icons/Search'
// import IconButton from '@material-ui/core/IconButton'

class FindEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { t, events, selectedCity } = this.props
    return (
      <div className="find-event-holder">
        {/* <div className="find-event-button">
          <TextField
            id="outlined-name"
            className="find-event-element"
            label={t('find-events')}
            margin="normal"
            variant="outlined"
          />
          <IconButton aria-label="search" onClick={this.onClickSubmit}>
            <SearchIcon />
          </IconButton>
        </div> */}
        <EventBanner
          title={t('events-banner-title')}
          city={selectedCity && selectedCity.name}
        />
        {events.length === 0 ? (
          <NotFoundBanner
            title={t('events-not-found', 'error-message')}
            subtitle={t('subtitle-error-message')}
          />
        ) : (
          <Slider>
            {events.map((event, index) => (
              <EventCard key={45} myParvezData={index} data={event} />
            ))}
          </Slider>
        )}
      </div>
    )
  }
}

export default withTranslation()(FindEvent)
