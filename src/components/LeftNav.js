import React from 'react'
import { Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const LeftNav = (props) => {
  return (
    <div>
      <Nav vertical>
        <NavItem>
          <Link to="/about" className="nav-link">About</Link>
        </NavItem>
      </Nav>
      <hr />
    </div>
  )
}

LeftNav.propTypes = {}
LeftNav.defaultProps = {}

export default LeftNav
