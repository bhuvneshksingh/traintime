import React, { Component } from 'react'

import { withTranslation } from 'react-i18next'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'

// import GridList from '@material-ui/core/GridList'
// import GridListTile from '@material-ui/core/GridListTile'
// import IconButton from '@material-ui/core/IconButton'
// import CloseIcon from '@material-ui/icons/Close'

import Lightbox, { Modal, ModalGateway } from 'react-images'

import Slider from '../slider'

import PhotoSlide from './photo-slide'
import BackButton from './back-button'
import NextButton from './next-button'
import FullScreenButton from './full-screen-button'
// import ShowAllPhotosButton from './show-all-button' //comments photo library and photo library icon, here in gallery.js we refer to a component in show-all.js we refer to an icon
import PhotoPreview from './photo-preview'
import AlbumPreview from './album-preview'

// if we already export something export default in bottom of the page than in our code we need to delete another export default
class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      smallScreen: false,
      gallerySize: {
        width: '100%',
        height: 'auto',
      },
      currentAlbum: 0,
      currentPhotoIndex: 0,
      albums: [],
      images: [],
      previewImages: [],
      currentPreviewImageIndex: 0,
      translateValue: 0,
      slideDescriptionWidth: 0,
      previewContainerWidth: 0,
      quantityOfPhotoPreviews: 0,
      isLightboxOpen: false,
      isPhotoGridOpen: false,
    }
  }

  /**
   * @function getDerivedStateFromProps
   * React lifecycle method. Run each time when the component receive new props
   *
   * @param {Object} props
   * New props.
   *
   * @param {Object} state
   * Current state.
   */
  static getDerivedStateFromProps(props, state) {
    return {
      albums: props.albums.filter(album => album.images.length > 0),
      images: props.albums[state.currentAlbum].images,
    }
  }

  /**
   * @function componentDidMount
   * React lifecycle method. Run each time when the component did mount
   */
  componentDidMount() {
    const smallScreen = isWidthDown('sm', this.props.width) //taken from tab-item.js/navbar line 13
    const { currentPhotoIndex, images } = this.state

    const containerWidth =
      document.querySelector('.gallery-photo-title').clientWidth / 2

    // 114px
    const photoPreviewWidth = 114

    const galleryHeight = window.innerHeight - 50
    const galleryWidth = (galleryHeight / 75) * 100

    // Calculate quantity of photo preview inside preview-container div
    const quantityOfPhotoPreviews = Math.floor(
      containerWidth / photoPreviewWidth
    )

    this.populatePreviewImages(
      quantityOfPhotoPreviews,
      currentPhotoIndex,
      images
    )

    this.setState({
      smallScreen: smallScreen,
      gallerySize: {
        width: `${galleryWidth}px`,
        height: `${galleryHeight}px`,
      },
      slideDescriptionWidth: containerWidth,
      previewContainerWidth: containerWidth,
      quantityOfPhotoPreviews: quantityOfPhotoPreviews,
    })
  }

  /**
   * @function populatePreviewImages
   * Defines number of photos which will be show in preview-container
   *
   * @param {Number} quantityOfPhotoPreviews
   * Quantity of photo previews (small pictures)
   *
   * @param {Number} currentPhotoIndex
   * Index (index from photos array) of photo which is showing on slide
   *
   * @param {Array} images
   * List of images which are showing in gallery component
   *
   * @returns {Array}
   * Array of images to show in preview-container
   */
  populatePreviewImages = (
    quantityOfPhotoPreviews,
    currentPhotoIndex,
    images
  ) => {
    // copy list of all images for preview
    const previewImages = [...images]
    const nextPhotoIndex = currentPhotoIndex + 1
    const lastPhotoIndex = previewImages.length - 1
    const endIndex = currentPhotoIndex + quantityOfPhotoPreviews

    const isEnoughQuantityOfImages = images.length >= quantityOfPhotoPreviews

    const arr = []

    if (!isEnoughQuantityOfImages && currentPhotoIndex !== 0) {
      const previousPhotoIndex = currentPhotoIndex - 1

      // Here we put the previous photo in the last position
      const currentImage = previewImages.splice(previousPhotoIndex, 1)
      previewImages.push(currentImage[0])
    } else if (isEnoughQuantityOfImages && endIndex <= lastPhotoIndex) {
      // save current photo in new array
      arr.push(previewImages[currentPhotoIndex])

      // save all photos from next photo index to end photo index
      previewImages
        .slice(nextPhotoIndex, endIndex)
        .forEach(value => arr.push(value))
    } else {
      const differential = endIndex - lastPhotoIndex - 1

      // save current photo in new array of preview images
      arr.push(previewImages[currentPhotoIndex])

      // save all photos from the next photo to the last
      previewImages.slice(nextPhotoIndex).forEach(image => arr.push(image))

      // save all photos from the first photo to the photo with differential index
      previewImages.slice(0, differential).forEach(image => arr.push(image))
    }

    this.setState({
      previewImages: isEnoughQuantityOfImages ? arr : previewImages,
    })
  }

  /**
   * @function goToPrevSlide
   * Show previous photo slide
   */
  goToPrevSlide = () => {
    const {
      currentPhotoIndex,
      translateValue,
      quantityOfPhotoPreviews,
      images,
    } = this.state

    if (currentPhotoIndex !== 0) {
      const newPhotoIndex = currentPhotoIndex - 1
      const newTranslateValue = translateValue + this.slideWidth()

      this.populatePreviewImages(quantityOfPhotoPreviews, newPhotoIndex, images)

      this.setState({
        currentPhotoIndex: newPhotoIndex, // decrease current photo index
        translateValue: newTranslateValue,
      })
    }
  }

  /**
   * @function goToNextSlide
   * Show next photo slide
   */
  goToNextSlide = () => {
    const {
      currentPhotoIndex,
      translateValue,
      quantityOfPhotoPreviews,
      images,
    } = this.state

    const isTheLastPhoto = currentPhotoIndex === images.length - 1

    const newPhotoIndex = isTheLastPhoto ? 0 : currentPhotoIndex + 1
    const newTranslateValue = isTheLastPhoto
      ? 0
      : translateValue - this.slideWidth()

    this.populatePreviewImages(quantityOfPhotoPreviews, newPhotoIndex, images)

    this.setState({
      currentPhotoIndex: newPhotoIndex,
      translateValue: newTranslateValue,
    })
  }

  /**
   * @function changeAlbum
   * Change album
   *
   * @param {Number} id
   * id of new album
   */
  changeAlbum = id => {
    const { quantityOfPhotoPreviews, albums } = this.state

    const newPhotoIndex = 0
    const images = albums[id].images

    this.populatePreviewImages(quantityOfPhotoPreviews, newPhotoIndex, images)

    this.setState({
      currentAlbum: id,
      currentPhotoIndex: newPhotoIndex,
      images: images,
    })
  }
  changePhoto = photoID => {
    const { currentPhotoIndex, translateValue } = this.state
    const diff = Math.abs(currentPhotoIndex - photoID)
    console.log(`Photo ID: ${photoID}`)
    console.log(`Current ID: ${currentPhotoIndex}`)
    console.log(`Diff: ${diff}`)
    const newTranslateValue =
      currentPhotoIndex < photoID
        ? translateValue - this.slideWidth() * diff
        : translateValue + this.slideWidth() * diff
    this.setState({
      currentPhotoIndex: photoID,
      translateValue: newTranslateValue,
    })
  }

  /**
   * @function slideWidth
   * Returns width of div with photo-slide class
   *
   * @returns {Number}
   * Width of photo-slide div
   */
  slideWidth = () => {
    return document.querySelector('.photo-slide').clientWidth
  }

  /**
   * @function toggleLightbox
   * Toggle photo lightbox. Change state.isLightboxOpen on true if lightbox is open and vice versa
   */
  toggleLightbox = () => {
    this.setState(state => ({ isLightboxOpen: !state.isLightboxOpen }))
  }

  /**
   * @function toggleGridList
   * Toggle photo grid. Change state.isPhotoGrid on true if photo grid is open and vice versa
   */
  toggleGridList = () => {
    this.setState(state => ({ isPhotoGridOpen: !state.isPhotoGridOpen }))
  }

  render() {
    const { t } = this.props
    const {
      gallerySize,
      currentPhotoIndex,
      // checked,
      images,
      albums,
      previewImages,
      isLightboxOpen,
      // isPhotoGridOpen,
      previewContainerWidth,
      slideDescriptionWidth,
      translateValue,
      smallScreen,
    } = this.state

    const lightboxImages = images.map(image => ({ src: image.url }))

    return (
      <div className="gallery-container">
        <ModalGateway>
          {isLightboxOpen ? (
            <Modal onClose={this.toggleLightbox}>
              <Lightbox
                currentIndex={currentPhotoIndex}
                views={lightboxImages}
              />
            </Modal>
          ) : null}
        </ModalGateway>

        {/*<ModalGateway>*/}
        {/*    { isPhotoGridOpen ? (*/}
        {/*        <Modal onClose={ this.toggleGridList }>*/}
        {/*            <div className="grid-list">*/}
        {/*                <div className="control-buttons">*/}
        {/*                    <IconButton onClick={ this.toggleGridList }>*/}
        {/*                        <CloseIcon/>*/}
        {/*                    </IconButton>*/}
        {/*                </div>*/}
        {/*                <GridList>*/}
        {/*                    { images.map((image, i) => (*/}
        {/*                        <GridListTile key={ i }>*/}
        {/*                            <img*/}
        {/*                                src={ image.src }*/}
        {/*                                alt={ image.title }*/}
        {/*                            />*/}
        {/*                        </GridListTile>*/}
        {/*                    )) }*/}
        {/*                </GridList>*/}
        {/*            </div>*/}
        {/*        </Modal>*/}
        {/*    ) : null }*/}
        {/*</ModalGateway>*/}

        <div className="gallery" style={{ height: gallerySize.height }}>
          <div
            className="slides-container"
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: 'transform ease-out 0.65s',
            }}>
            {images.map((image, i) => (
              <PhotoSlide
                key={i}
                openPhoto={this.toggleLightbox}
                photoIndex={currentPhotoIndex}
                {...image}
              />
            ))}
          </div>
          <BackButton goToPrevSlide={this.goToPrevSlide} />
          <NextButton goToNextSlide={this.goToNextSlide} />
          <div className="options">
            <div className="buttons">
              {/*<ShowAllPhotosButton*/}
              {/*    showGridList={ this.toggleGridList }*/}
              {/*/>*/}
              <FullScreenButton showInFullScreen={this.toggleLightbox} />
            </div>
            <div className="gallery-photo-title">
              <div className="preview-container">
                {previewImages.map((image, i) => (
                  <PhotoPreview
                    key={i}
                    index={i}
                    changePhoto={this.changePhoto}
                    {...image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {this.props.mode !== 'event' ? (
          albums.length > 1 ? (
            <div className="albums-container">
              <h3>{t('albums')}</h3>
              <Slider>
                {albums.map((album, i) => (
                  <AlbumPreview
                    key={i}
                    albumIndex={i}
                    changeAlbum={this.changeAlbum}
                    {...album}
                  />
                ))}
              </Slider>
            </div>
          ) : null
        ) : null}
      </div>
    )
  }
}

export default withWidth()(withTranslation()(Gallery))
