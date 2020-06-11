import React, { Component } from 'react'

import { withTranslation } from 'react-i18next'

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined'

import PhotoPreviewCard from '../photo-preview-card'

class AddPhotosSportingLife extends Component {
  saveImages = event => {
    const images = []

    for (const image of event.target.files) {
      images.push({
        url: URL.createObjectURL(image),
        file: image,
        name: image.name,
        description: image.name,
      })
    }

    this.props.setMedia(images)
  }

  render() {
    const { t } = this.props

    return (
      <div className="main-page-container">
        <div className="photo-container-add-photos">
          <p>{t('media')}</p>

          <div className="upload-image">
            <input
              id="event-cover"
              className="file-picker"
              name="event-cover"
              type="file"
              accept="image/png, image/jpeg"
              multiple="multiple"
              onChange={this.saveImages}
            />
            <label htmlFor="event-cover" className="file-picker-label">
              <CloudUploadIcon />
              {t('upload-photo')}
            </label>
          </div>
        </div>
        <div className="cards">
          {this.props.media.map((media, index) => (
            <PhotoPreviewCard
              key={index}
              index={index}
              src={media.url}
              name={media.name}
              deleteMedia={this.props.deleteMedia}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default withTranslation()(AddPhotosSportingLife)
