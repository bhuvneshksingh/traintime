import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";

export default class CreateNewReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false
        }
    }

    handleClickOpen = () => {
        this.setState({ isDialogOpen: true });
    }

    handleClose = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        const { isDialogOpen } = this.state;
        return (
            <React.Fragment>
                <Button color="primary" variant="outlined" onClick={ this.handleClickOpen }>Add new review</Button>
                <Dialog
                    open={ isDialogOpen }
                    onClose={ this.handleClose }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="create-review-dialog-title">{ "Your review" }</DialogTitle>
                    <DialogContent className="review-form">
                        <div className="rate">
                            <Rating value={ 5 }/>
                            <p>Route</p>
                        </div>
                        <div className="rate">
                            <Rating value={ 5 }/>
                            <p>Service</p>
                        </div>
                        <div className="rate">
                            <Rating value={ 5 }/>
                            <p>Description quality</p>
                        </div>
                        <div className="rate">
                            <Rating value={ 5 }/>
                            <p>Location</p>
                        </div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Your review"
                            multiline
                            rowsMax="10"
                            margin="normal"
                            className="input"
                            variant="outlined"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ this.handleClose } color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={ this.handleClose } color="primary" autoFocus>
                            Publish
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
