import React from 'react'

export default function NotFoundBanner(props) {
  return (
    <div className="not-found-banner-container">
      <div className="not-found-banner">
        <div className="not-found-banner-text">
          <h3>{props.title}</h3>
          <p>{props.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
