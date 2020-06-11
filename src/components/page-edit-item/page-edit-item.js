import React from 'react'

import { withTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'

function PageEditItem(props) {
  return (
    <div className="page-edit-item">
      <p className="page-edit-item__title">{props.title}</p>
      <div className="page-edit-item__content">{props.children}</div>
      {props.showActions ? (
        <div className="page-edit-item__actions">
          <Button variant="outlined" onClick={() => props.onCancel(props.type)}>
            {props.t('cancel')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => props.onSave(props.type)}>
            {props.t('save')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default withTranslation()(PageEditItem)
