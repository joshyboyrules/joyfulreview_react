import React from 'react'
import classnames from 'classnames'
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import MediaQuery from 'react-responsive'

import './App.css'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import About from './components/About'
import Post from './components/Post'
import RightNav from './components/RightNav'
import { getHelper } from './utils/requestHelper'
import SiteMap from './components/SiteMap'
// import { parse } from 'url'
// import { homepage } from '../package.json'

// const basename = parse(homepage).pathname

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
  withState('searchValue', 'setSearchValue', []),
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
const App = enhance((props) => {
  const { posts } = props
  return (
    <BrowserRouter>
      <div className={classnames({ 'drawer-open': props.drawerOpen })}>
        <div className={'header'} style={{ minHeight: '4rem' }}>
          <div className={'container'} style={{ minHeight: '4rem' }}>
            <div className={'row align-items-center'} style={{ minHeight: '4rem' }}>
              <div className={'col-12'}>
                <div className="row">
                  <div className="col-8 align-self-center">
                    <Link to="/" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                      <h1 className={'custom-header'} style={{ paddingLeft: '15px' }}>Joyful Review</h1>
                    </Link>
                  </div>
                  <div className={'col-3 align-self-center d-none d-sm-none d-md-block'}>
                    <Link to="/sitemap" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                      <span>Directory</span>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/about" style={{ color: 'rgba(0, 0, 0, 0.54)', textDecoration: 'none' }}>
                      <span>About</span>
                    </Link>
                  </div>
                  <MediaQuery minWidth={720}>
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
                  </MediaQuery>
                  <MediaQuery maxWidth={719}>
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
                  </MediaQuery>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-12'}>
                <Switch>
                  <Route exact path="/" component={() => <Home posts={posts}/>}/>
                  <Route exact path="/about" component={About}/>
                  <Route exact path="/sitemap" component={SiteMap}/>
                  <Route path="/post/:id/:title" component={Post}/>
                  <Route component={PageNotFound}/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
})

export default App
