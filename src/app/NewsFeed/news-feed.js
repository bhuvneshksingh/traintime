import React, { Component, Fragment } from 'react'
import PageSection from '../../components/page-section'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Birthday from '../../assets/birthday.png'
import Search from '../../assets/search.png'
import NewsFeedPost from '../../components/news-post'

class NewsFeed extends Component {
  render() {
    return (
      <Fragment>
        <PageSection className="greeting-banner-container">
          <div className="greeting-banner">
            <img src={Birthday} alt="birthday" />
            <hgroup>
              <h1>Welcome Douglas!</h1>
              <h4>
                {' '}
                Congratulations you have just registered with us, let's start
                some activity{' '}
              </h4>
            </hgroup>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '150px',
              }}>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="greeting-banner">
            <img src={Search} alt="Search" />
            <hgroup>
              <h1>Let's help people find you</h1>
              <h4> Tell people about yoursef. Tell about your hobbies </h4>
            </hgroup>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '150px',
              }}>
              <IconButton>
                <CloseIcon />
              </IconButton>
              <Button variant="outlined">Add Information</Button>
            </div>
          </div>
        </PageSection>

        <PageSection>
          <h3>Your news feed </h3>
          <Divider />
          <section className="main-container">
            <div className="post-container">
              <NewsFeedPost />
              <NewsFeedPost />
            </div>

            <aside className="upcoming-events">
              <div className="hiking-in-the-tatras">
                <h1>hello lukas</h1>
              </div>
            </aside>
          </section>
        </PageSection>
      </Fragment>
    )
  }
}

export default NewsFeed
