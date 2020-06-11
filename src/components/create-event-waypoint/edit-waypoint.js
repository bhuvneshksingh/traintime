import React from 'react'

import { Button, TextField } from '@material-ui/core'

import ImageIcon from '@material-ui/icons/Image'

export default function EditWaypoint(props) {
    const {
        data: { name, location, description, image },
        onSaveClick,
    } = props

    return (
        <div className="edit-event-waypoint">
            <div className="elements-container">
                <Button className="add-photo-button">
                    {image ? (
                        <img className="waypoint-preview" src={`${image}`} />
                    ) : (
                        <ImageIcon />
                    )}
                </Button>
                <div className="waypoint-text-fields-container">
                    <div className="horizontal-text-fields-container">
                        <TextField
                            id="waypoint-name"
                            className="waypoint-name"
                            label="Name of waypoint"
                            value={name}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="waypoint-location"
                            className="waypoint-location"
                            label="Location of waypoint"
                            value={location}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <TextField
                        id="waypoint-description"
                        className="waypoint-description"
                        label="Description of waypoint"
                        value={description}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rowsMax="3"
                    />
                </div>
            </div>
            <div className="save-waypoint-button">
                <Button color="primary" onClick={onSaveClick}>
                    Save
                </Button>
            </div>
        </div>
    )
}
