import React from 'react'

import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/EditOutlined'

export default function ShowWaypoint(props) {
    const {
        data: { name, location, description, image },
        onEditClick,
    } = props

    const alt = `${name} | ${description} | ${location}`
    return (
        <div className="show-event-waypoint">
            <img src={image} />
            <Fab
                className="edit-button"
                aria-label="edit"
                onClick={onEditClick}
            >
                <EditIcon />
            </Fab>
            <div className="waypoint-description">
                <div>
                    <h4>{name}</h4>
                    <p>{location}</p>
                </div>
                <p>{description}</p>
            </div>
        </div>
    )
}
