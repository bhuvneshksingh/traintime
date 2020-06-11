import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

export default class NextButton extends Component {
    render() {
        return (
            <Button
                className="control-button button-style next"
                variant="contained"
                onClick={this.props.goToNextSlide}
            >
                <ArrowRightIcon />
            </Button>
        );
    }
}
