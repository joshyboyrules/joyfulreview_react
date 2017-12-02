import React from 'react'
import PropTypes from 'prop-types'
import './OutsideLink.css'

const OutsideLink = (props) => {
  const { url, text } = props
  return (
    <span
      className={'hover-click outside-link'}
      onClick={() => window.open(url, '_blank')}>
      {text}
    </span>
  )
}

OutsideLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

OutsideLink.defaultProps = {}

export default OutsideLink
