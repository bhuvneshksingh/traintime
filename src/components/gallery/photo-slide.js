import React from 'react'

export default function PhotoSlide(props) {
  const { openPhoto, url, title } = props
  return (
    <div className="photo-slide" onClick={() => openPhoto()}>
      <img src={url} alt={title} />
    </div>
  )
}
