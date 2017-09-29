import React, { Component } from 'react'
import './App.css'
import LeftNav from './components/LeftNav'
import classnames from 'classnames'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import About from './components/About'
import Post from './components/Post'

class App extends Component {
  render () {
    return (
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className={classnames('App', 'App-header')}>
            <h2>[JR] JoyfulReview</h2>
          </div>
        </Link>
        <br/>
        <div>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-md-2 col-sm-12'}>
                <LeftNav/>
              </div>
              <div className={'col-md-10 col-sm-12'}>
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/about" component={About}/>
                  <Route path="/post/:id/:title" component={Post}/>
                  <Route component={PageNotFound}/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
