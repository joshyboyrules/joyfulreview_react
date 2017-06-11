import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Container, Row, Col } from 'reactstrap'
import LeftNav from './components/LeftNav'
import classnames from 'classnames'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import About from './components/About'
import Post from './components/Post'

class App extends Component {
  render () {
    return (
      <div>
        <div className={classnames('App', 'App-header')}>
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to joyfulreview!</h2>
        </div>
        <br/>
        <div>
          <Container>
            <Row>
              <Col md="2">
                <LeftNav/>
              </Col>
              <Col md="10">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route path="/post/:id/:title" component={Post} />
                  <Route component={PageNotFound} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default App
