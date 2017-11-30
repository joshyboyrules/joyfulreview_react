import React from 'react'
import classnames from 'classnames'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import Header from './components/Header'

import './App.css'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import About from './components/About'
import Post from './components/Post'
import { getHelper } from './utils/requestHelper'
import SiteMap from './components/SiteMap'

const addAppState = compose(
  withState('categories', 'setCategories', []),
  withProps(({ setCategories }) => ({
    updateCategories: (categories) => setCategories(() => categories)
  })),
  withState('searchValue', 'setSearchValue', ''),
  withProps(({ setSearchValue }) => ({
    updateSearchValue: (searchValue) => setSearchValue(() => searchValue)
  })),
  withState('posts', 'setPosts', []),
  withProps(({ setPosts }) => ({
    updatePosts: (posts) => setPosts(() => posts)
  })),
  withState('drawerOpen', 'setOpen', true),
  withProps(({ setOpen }) => ({
    handleDrawerOpen: () => setOpen(() => true),
    handleDrawerClose: () => setOpen(() => false)
  }))
)

const enhance = compose(
  setDisplayName('App'),
  addAppState,
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
      <Route exact path="/" render={props => <Home posts={posts} {...props}/>}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/sitemap" component={SiteMap}/>
      <Route path="/post/:id/:title" component={Post}/>
      <Route component={PageNotFound}/>
    </Switch>
  )
}

export default AppContainer
