import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import Close from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import '../Card/index.css'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyId: '',
      editItem: false,
      newItemName: '',
    }
  }

  enableEditItem = () => {
    this.setState({ editItem: true })
  }

  sendItemName = () => {
    this.props.editThisItem(this.state.newItemName, this.props.keyId)
    this.setState({ editItem: false })
  }

  sendData = () => {
    this.props.deleteThisItem(this.props.keyId)
  }

  sendStateDialogMedia = () => {
    this.props.openDialogMedia(this.props.title, this.props.keyId)
  }

  render() {
    const inputAlbumEdit = {
      margin: '10px 0 0 5px',
    }
    return (
      <div className="card">
        <img
          className="card__img"
          src={this.props.imageUrl}
          alt=""
          onClick={this.sendStateDialogMedia}
        />
        {this.props.typeAlbum && (
          <Fragment>
            {this.props.title && (
              <div>
                {this.state.editItem ? (
                  <FormControl style={inputAlbumEdit} variant="outlined">
                    <InputLabel ref="" htmlFor="component-outlined">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      id="component-outlined"
                      value={this.state.newItemName}
                      onChange={event =>
                        this.setState({ newItemName: event.target.value })
                      }
                      labelWidth={40}
                    />
                  </FormControl>
                ) : (
                  <div className="card__title">{this.props.title}</div>
                )}
              </div>
            )}
            <div className="card__actions">
              {this.state.editItem ? (
                <button className="button-edit" onClick={this.sendItemName}>
                  Save
                </button>
              ) : (
                <button className="button-edit" onClick={this.enableEditItem}>
                  Edit album
                </button>
              )}
              <div className="button-delete">
                <DeleteIcon onClick={this.sendData} />
              </div>
            </div>
          </Fragment>
        )}

        {this.props.typePhoto && (
          <Fragment>
            <div className="card__close">
              <img src={Close} alt="" />
            </div>
            <TextField
              placeholder="Photo title"
              defaultValue={this.props.title}
              className="photo__title"
            />
            <TextField
              placeholder="Location"
              defaultValue={this.props.location}
              className="photo__location"
            />
            <TextField
              multiline
              rows="4"
              placeholder="Description"
              defaultValue={this.props.description}
              className="photo__description"
            />
          </Fragment>
        )}

        {this.props.typeEvent && (
          <Fragment>
            {this.props.title && (
              <div className="card__title">{this.props.title}</div>
            )}
            <div className="card__actions">
              <button className="button-edit">Edit Event</button>
              <div className="button-delete">
                <DeleteIcon onClick={this.sendData} />
              </div>
            </div>
          </Fragment>
        )}

        {this.props.typeShowMedia && (
          <Fragment>
            <div className="card__close">
              <img src={Close} alt="" />
            </div>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <TextField
              placeholder="Location"
              defaultValue={this.props.location}
              className="photo__location"
            />
            <TextField
              multiline
              rows="4"
              placeholder="Description"
              defaultValue={this.props.description}
              className="photo__description"
            />
          </Fragment>
        )}
      </div>
    )
  }
}

Card.propTypes = {
  keyId: PropTypes.number,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  typeAlbum: PropTypes.bool,
  typePhoto: PropTypes.bool,
  typeEvent: PropTypes.bool,
  typeShowMedia: PropTypes.bool,
}

Card.defaultProps = {
  typeAlbum: false,
  typePhoto: false,
  typeEvent: false,
  typeShowMedia: false,
}
