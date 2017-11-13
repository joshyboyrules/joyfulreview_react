import React from 'react'
import classnames from 'classnames'
import { Switch, Route, Link, BrowserRouter, withRouter } from 'react-router-dom'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
// import { withRouter } from 'react-router'
import MediaQuery from 'react-responsive'

import './App.css'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import About from './components/About'
import Post from './components/Post'
import RightNav from './components/RightNav'
import { getHelper } from './utils/requestHelper'
import SiteMap from './components/SiteMap'

const addOpenCloseState = compose(
  withState('drawerOpen', 'setOpen', true),
  withProps(({ setOpen }) => ({
    handleDrawerOpen: () => setOpen(() => true),
    handleDrawerClose: () => setOpen(() => false)
  }))
)

const addPostsState = compose(
  withState('posts', 'setPosts', []),
  withProps(({ setPosts }) => ({
    updatePosts: (posts) => setPosts(() => posts)
  }))
)

const addSearchState = compose(
  withState('searchValue', 'setSearchValue', ''),
  withProps(({ setSearchValue }) => ({
    updateSearchValue: (searchValue) => setSearchValue(() => searchValue)
  }))
)

const enhance = compose(
  setDisplayName('App'),
  addOpenCloseState,
  addPostsState,
  addSearchState,
  lifecycle({
    componentWillMount: function () {
      if (window.innerWidth <= 720) {
        this.props.handleDrawerClose()
      }
      getHelper(`/posts`).then((response) => {
        this.props.updatePosts(response.data)
      })
    }
  })
)

const AppContainer = (props) => {
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  )
}

const App = enhance((props) => {
  return (
    <div className={classnames({ 'drawer-open': props.drawerOpen })}>
      <Header {...props}/>
      <div className={'container-fluid'}>
        <div className={'row'}>
          <div className={'col-12'}>
            <Switcher {...props}/>
          </div>
        </div>
      </div>
    </div>
  )
})

const Switcher = (props) => {
  const { posts } = props
  return (
    <Switch>
      <Route exact path="/" component={() => <Home posts={posts}/>}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/sitemap" component={SiteMap}/>
      <Route path="/post/:id/:title" component={Post}/>
      <Route component={PageNotFound}/>
    </Switch>
  )
}

const enhanceHeader = compose(
  setDisplayName('Header'),
  lifecycle({
    componentDidMount: function () {
      const locationPathName = this.props.location.pathname
      const onHomePageBoolean = (locationPathName === '/')
      if (!onHomePageBoolean) {
        // console.log('header drawer close')
        this.props.handleDrawerClose()
      }
    },
    componentDidUpdate: function (prevProps) {
      if (this.props.location !== prevProps.location) {
        const onHomePageBoolean = isOnHomePage(this.props.location)
        // console.log('location path name', locationPathName)
        if (!onHomePageBoolean) {
          // console.log('header drawer close')
          this.props.handleDrawerClose()
        } else if (onHomePageBoolean && !this.props.drawerOpen) {
          // console.log('header drawer open')
          this.props.handleDrawerOpen()
        }
      }
    }
  })
)

function isOnHomePage (location) {
  const locationPathName = location.pathname
  return (locationPathName === '/')
}

const Header = withRouter(enhanceHeader((props) => {

  console.log('header props', props)
  const onHomePageBoolean = isOnHomePage(props.location)

  return (
    <div className={'header'} style={{ minHeight: '4rem' }}>
      <div className={'container-fluid'} style={{ minHeight: '4rem', paddingLeft: '30px', paddingRight: '30px' }}>
        <div className={'row align-items-center'} style={{ minHeight: '4rem' }}>
          <div className={'col-12'}>
            <div className="row">
              <div className="col-8 align-self-center">
                <Link to="/" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                  <h1 className={'custom-header'}>Joyful Review</h1>
                </Link>
              </div>
              {/*<div className={'col-3 align-self-center d-none d-sm-none d-md-block'}>*/}
              <div
                className={classnames(
                  'align-self-center',
                  'd-none',
                  'd-sm-none',
                  'd-md-block',
                  'text-right',
                  {
                    'col-3': onHomePageBoolean,
                    'col-4': !onHomePageBoolean
                  }
                )}>
                <Link to="/sitemap" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                  <span>Directory</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/about" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                  <span>About</span>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                  <span>Search</span>
                </Link>
              </div>
              {onHomePageBoolean && <MediaQuery minWidth={720}>
                <div className={'col-1 align-self-center'}>
                  <RightNav
                    open={props.drawerOpen}
                    handleDrawerOpen={props.handleDrawerOpen}
                    handleDrawerClose={props.handleDrawerClose}
                    type={'persistent'}
                    searchValue={props.searchValue}
                    updateSearchValue={props.updateSearchValue}
                    updatePosts={props.updatePosts}
                  />
                </div>
              </MediaQuery>}
              {onHomePageBoolean && <MediaQuery maxWidth={719}>
                <div className={'col-1 align-self-center'}>
                  <RightNav
                    open={props.drawerOpen}
                    handleDrawerOpen={props.handleDrawerOpen}
                    handleDrawerClose={props.handleDrawerClose}
                    type={'transparent'}
                    searchValue={props.searchValue}
                    updateSearchValue={props.updateSearchValue}
                    updatePosts={props.updatePosts}
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

export default AppContainer
