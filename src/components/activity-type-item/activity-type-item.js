import React from 'react'
import Button from '@material-ui/core/Button'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

export default function ActivityTypeItem(props) {
  const {
    src,
    data: { name, description },
    isDisabled,
  } = props
  const imgDescription = `${name} - ${description}`

  return (
    <Button
      disabled={isDisabled}
      className="activity-type-item"
      onClick={() => props.onClick(props.type)}>
      <img src={src} alt={imgDescription} />
      <div className="tile-text">
        <p>{name}</p>
        <p>{description}</p>
      </div>
      {isDisabled ? <LockOutlinedIcon className="lock-icon" /> : null}
    </Button>
  )
}
