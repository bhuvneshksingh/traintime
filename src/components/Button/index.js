import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { default as MaterialButton } from '@material-ui/core/Button'

import './index.css'

const Button = props => {
  const {
    className,
    children,
    typePrimary,
    typeSecondary,
    ...restProps
  } = props
  const componentClass = classNames('button', className, {
    'button--primary': typePrimary,
    'button--secondary': typeSecondary,
  })

  return (
    <MaterialButton
      variant="outlined"
      className={componentClass}
      {...restProps}>
      {children}
    </MaterialButton>
  )
}

Button.propTypes = {
  typePrimary: PropTypes.bool,
  typeSecondary: PropTypes.bool,
}

Button.defaultProps = {
  typePrimary: false,
  typeSecondary: false,
}

export default Button
