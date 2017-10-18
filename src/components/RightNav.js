import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import IconButton from 'material-ui/IconButton'

const RightNav = (props) => {
  return (
    <span>
      {!props.open && <span
        className={'btn btn-info hover-click'}
        onClick={() => {
          props.open ? props.handleDrawerClose() : props.handleDrawerOpen()
        }}
      >
        Menu
      </span>}
      {props.open &&
      <IconButton onClick={props.handleDrawerClose} style={{ padding: 0, margin: 0 }}>
        <ChevronRightIcon/>
      </IconButton>}
      <Drawer
        type={props.type}
        anchor="right"
        open={props.open}
        onRequestClose={() => props.handleDrawerClose()}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => props.handleDrawerClose()}
          style={{ minWidth: '260px' }}>
          <div style={{ minHeight: '4rem', borderBottom: '1px solid lightgrey' }} className={'container'}>
            <div className="row" style={{ minHeight: '4rem' }}>
              <div className="col align-self-center text-center">menu</div>
            </div>
          </div>
        </div>
      </Drawer>
    </span>
  )
}

export default RightNav
