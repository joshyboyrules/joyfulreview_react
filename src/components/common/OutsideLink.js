import React from 'react'
import PropTypes from 'prop-types'

const linkStyle = {
  color: '#007bff'
}

const OutsideLink = (props) => {
  const { url, text } = props
  return (
    <span
      className={'hover-click'}
      style={linkStyle}
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
