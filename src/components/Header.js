import React from 'react'

import { Link, withRouter } from 'react-router-dom'
import { compose, setDisplayName, lifecycle } from 'recompose'
import MediaQuery from 'react-responsive'
import classnames from 'classnames'
import { Search } from 'react-feather'

import RightNav from './RightNav'

function isOnHomePage (location) {
  const locationPathName = location.pathname
  return (locationPathName === '/')
}

const enhanceHeader = compose(
  setDisplayName('Header'),
  lifecycle({
    componentDidMount: function () {
      const locationPathName = this.props.location.pathname
      const onHomePageBoolean = (locationPathName === '/')
      if (!onHomePageBoolean) {
        this.props.handleDrawerClose()
      }
    },
    componentDidUpdate: function (prevProps) {
      if (this.props.location !== prevProps.location) {
        const onHomePageBoolean = isOnHomePage(this.props.location)
        if (!onHomePageBoolean) {
          this.props.handleDrawerClose()
        } else if (onHomePageBoolean && !this.props.drawerOpen) {
          this.props.handleDrawerOpen()
        }
      }
    }
  })
)

const Header = withRouter(enhanceHeader((props) => {

  const onHomePageBoolean = isOnHomePage(props.location)

  return (
    <div className={'header'} style={{ minHeight: '4rem' }}>
      <div className={'container-fluid'} style={{ minHeight: '4rem', paddingLeft: '30px', paddingRight: '30px' }}>
        <div className={'row align-items-center'} style={{ minHeight: '4rem' }}>
          <div className={'col-12'}>
            <div className="row">
              <div className="col-11 col-md-7 align-self-center">
                <Link to="/">
                  <h1 className={'custom-header'}>
                    <img
                      alt={'feather icon'}
                      src={'https://joyfulreview.files.wordpress.com/2017/11/joy_logo.png'}
                      height={36}
                      style={{ marginTop: '-5px', paddingRight: '5px', paddingLeft: '15px' }}
                    />
                    joyfulreview
                  </h1>
                </Link>
              </div>
              <div
                className={classnames(
                  'align-self-center',
                  'd-none',
                  'd-sm-none',
                  'd-md-block',
                  'text-right',
                  {
                    'col-4': onHomePageBoolean
                  }
                )}>
                <Link to="/" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                  <span
                    style={
                      { fontSize: '14px', fontWeight: '500', paddingRight: '40px' }
                    }
                    className={classnames(
                      {
                        'red-text': onHomePageBoolean, 'grey-text': !onHomePageBoolean
                      }
                    )}
                  >
                    DIRECTORY
                  </span>
                </Link>
                <Link to="/sitemap" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                  <span
                    style={
                      { fontSize: '14px', fontWeight: '500', paddingRight: '40px' }
                    }
                    className={classnames(
                      {
                        'red-text': props.location.pathname === '/sitemap',
                        'grey-text': props.location.pathname !== '/sitemap'
                      }
                    )}
                  >
                    SITEMAP
                  </span>
                </Link>
                <Link to="/about" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                  <span
                    style={{ fontSize: '14px', fontWeight: '500' }}
                    className={classnames(
                      {
                        'red-text': props.location.pathname === '/about',
                        'grey-text': props.location.pathname !== '/about'
                      }
                    )}>
                    ABOUT
                  </span>
                </Link>
              </div>
              {!props.drawerOpen &&
              <div
                className={classnames('align-self-center', 'text-right', 'col-1')}>
                <Search
                  className={'hover-click'}
                  size={24}
                  onClick={() => {
                    if (onHomePageBoolean) {
                      props.handleDrawerOpen()
                    } else {
                      console.log('props', props)
                      props.history.push('/')
                    }
                  }}
                />
              </div>}
              {onHomePageBoolean && <MediaQuery minWidth={720}>
                <div className={'col-1 align-self-center'}>
                  <RightNav {...props}
                            type={'persistent'}
                  />
                </div>
              </MediaQuery>}
              {onHomePageBoolean && <MediaQuery maxWidth={719}>
                <div className={'col-1 align-self-center'}>
                  <RightNav {...props}
                            type={'transparent'}
                  />
                </div>
              </MediaQuery>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}))

export default Header
