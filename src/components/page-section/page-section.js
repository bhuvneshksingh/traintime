import React from 'react'

export default function PageSection(props) {
  return (
    <React.Fragment>
      {props.unmount ? null : (
        <section className="page-section"> {props.children}</section>
      )}
    </React.Fragment>
  )
}
