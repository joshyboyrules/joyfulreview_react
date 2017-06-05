import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

const LeftNav = (props) => {
  return (
    <div>
      <Nav vertical>
        <NavItem>
          <Link to="/" className="nav-link">Home</Link>
        </NavItem>
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
