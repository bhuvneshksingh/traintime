import React from 'react'

import { MinusIcon, PlusIcon } from '../../icons'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

export default function AmountPicker(props) {
  return (
    <div className="amount-picker">
      <IconButton
        className="control-button"
        onClick={() => decrease(props.value, props.onNumberSet)}>
        <MinusIcon />
      </IconButton>
      <TextField
        value={props.value}
        className="input"
        type="text"
        onChange={event => onInputChange(event.target.value, props.onNumberSet)}
      />
      <IconButton
        className="control-button"
        onClick={() => increase(props.value, props.onNumberSet)}>
        <PlusIcon />
      </IconButton>
    </div>
  )
}

function increase(prevValue, setNewValue) {
  setNewValue(prevValue + 1)
}

function decrease(prevValue, setNewValue) {
  prevValue > 0 ? setNewValue(prevValue - 1) : setNewValue(prevValue)
}

function onInputChange(value, setNewValue) {
  if (value === '') {
    setNewValue('')
  } else {
    const number = parseInt(value)
    if (!Number.isNaN(number) && number >= 0) setNewValue(number)
  }
}
