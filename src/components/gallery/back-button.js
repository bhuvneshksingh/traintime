import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

export default class BackButton extends Component {
    render() {
        return (
            <Button
                className="control-button button-style back"
                variant="contained"
                onClick={this.props.goToPrevSlide}
            >
                <ArrowLeftIcon />
            </Button>
        );
    }
}
