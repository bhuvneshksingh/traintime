import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Divider from '@material-ui/core/Divider'
// import AppStoreIcon from '../../assets/app_store.png'
// import GooglePlayIcon from '../../assets/google_play.png'

import FacebookIcon from '../../icons/facebook'
import TwitterIcon from '../../icons/twitter'
import YoutubeIcon from '../../icons/youtube'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="info-container">
          <div className="info-box main-content">
            <h3>Information</h3>
            <Divider className="divider-color" />
            <ul>
              <li>
                <a href="https://about.train-time.com/">About company</a>
              </li>
              <li>
                <a href="https://about.train-time.com/news/">Latest news</a>
              </li>
              <li>
                <a href="https://about.train-time.com/career/">Career </a>
              </li>
            </ul>
          </div>

          <div className="info-box main-content">
            <h3>Contacts</h3>
            <Divider className="divider-color" />
            <ul>
              <li>
                <a href="https://about.train-time.com/support/">Support</a>
              </li>
            </ul>
          </div>

          {/* <div className="info-box main-content">
            <h3>Services</h3>
            <Divider className="divider-color" />
            <ul>
              <li>
                <a href="/">item 1</a>
              </li>
              <li>
                <a href="/">item 2</a>
              </li>
              <li>
                <a href="/">item 3</a>
              </li>
              <li>
                <a href="/">item 4</a>
              </li>
            </ul>
          </div> */}

          {/* <div className="info-box app-download">
                        <h3>Mobile applications</h3>
                        <Divider className="divider-color" />
                        <div className="link-container">
                            <a href="/">
                                <img src={AppStoreIcon} />
                            </a>
                            <a href="/">
                                <img src={GooglePlayIcon} />
                            </a>
                        </div>
                    </div> */}
        </div>

        <div className="bottom-info-container">
          <p>
            <a href="https://about.train-time.com/terms-and-conditions/">
              Terms and Conditions
            </a>
          </p>
          <h4>2019 Company name, Inc. All rights reserved</h4>
          <div className="share-buttons-container">
            <p className="social-media">Follow us</p>

            <Link to="/">
              <div className="facebook-color">
                <FacebookIcon />
              </div>
            </Link>

            <Link to="/">
              <div className="twitter-color">
                <TwitterIcon />
              </div>
            </Link>
            <Link to="/">
              <div className="youtube-color">
                <YoutubeIcon />
              </div>
            </Link>
          </div>
        </div>
      </footer>
    )
  }
}
