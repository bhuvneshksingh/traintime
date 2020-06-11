import React, { Component } from 'react'

import ShowWaypoint from './show-wayloint'
import EditWaypoint from './edit-waypoint'

export default class CreateEventWaypoint extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditMode: true,
        }
    }

    onEditClick = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    onSaveClick = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    render() {
        const { data } = this.props

        const { isEditMode } = this.state

        return (
            <React.Fragment>
                {isEditMode ? (
                    <ShowWaypoint data={data} onEditClick={this.onEditClick} />
                ) : (
                    <EditWaypoint data={data} onSaveClick={this.onSaveClick} />
                )}
            </React.Fragment>
        )
    }
}
