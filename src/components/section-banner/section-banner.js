import React, { Component } from 'react'

import { getRandomBannerPhoto } from '../../utils/default-data'

export default class SectionBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerImage: null,
    }

    getRandomBannerPhoto(this.setBannerImage)
  }

  setBannerImage = bannerImage => {
    this.setState({ bannerImage })
  }

  render() {
    const { title, city } = this.props
    return (
      <div className="section-banner-holder">
        <div className="title-holder">
          <h2>{`${title} ${city === undefined ? '' : city}`}</h2>
        </div>
        <img
          src={this.state.bannerImage}
          alt={`${title} ${city} | Sport Events | train-time.com`}
        />
      </div>
    )
  }
}
