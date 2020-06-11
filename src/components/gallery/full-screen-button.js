import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import IconFullScreen from "@material-ui/icons/Fullscreen";

export default class FullScreenButton extends Component {
    render() {
        return (
            <Button
                className="button-style option-button"
                variant="contained"
                onClick={this.props.showInFullScreen}
            >
                <IconFullScreen />
                FULL SCREEN
            </Button>
        );
    }
}
