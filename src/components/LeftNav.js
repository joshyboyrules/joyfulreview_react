import React from 'react'
import { Link } from 'react-router-dom'

const LeftNav = (props) => {
  return (
    <div>
      <Link to="/about" className="nav-link">About</Link>
      <hr/>
    </div>
  )
}

LeftNav.propTypes = {}
LeftNav.defaultProps = {}

export default LeftNav
