import React, { Component, Fragment } from 'react'

import { withTranslation } from 'react-i18next'

import PageSection from '../../components/page-section'

import RecomendedEventsBanner from '../../components/recomended-events'
import RecomendedUsersBanner from '../../components/recomended-users'

import Bike from './Bike/bike'

class NotFoundPage extends Component {
  render() {
    return (
      <Fragment>
        <PageSection>
          <Bike />
          <h1 className="page-not-found">“Page not found.”</h1>
        </PageSection>
        <PageSection>
          <RecomendedUsersBanner />
        </PageSection>
        <PageSection>
          <RecomendedEventsBanner />
        </PageSection>
      </Fragment>
    )
  }
}

export default withTranslation()(NotFoundPage)
