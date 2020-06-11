import React, { Component } from 'react'

export default class CharacterCounter extends Component {
  render() {
    return (
      <div className="character-counter">
        <div className="character-counter--container">
          {this.props.children}
        </div>
        <span className="character-counter--label">{`${0}/${150}`}</span>
      </div>
    )
  }
}
