import React, {Component} from "react";

import Button from '@material-ui/core/Button';
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

export default class ShowAllButton extends Component {
    render() {
        return (
            <Button
                className="button-style option-button"
                variant="contained"
                onClick={this.props.showGridList}
            >
                <PhotoLibraryIcon/>
                SHOW All
            </Button>
        );
    }
}
