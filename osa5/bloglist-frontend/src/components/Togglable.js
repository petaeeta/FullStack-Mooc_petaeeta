import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {

  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const togglableStyle = {
    paddingTop: 4,
    paddingbottom: 4
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={togglableStyle}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div style={togglableStyle}>
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </div>
  )
})

export default Togglable