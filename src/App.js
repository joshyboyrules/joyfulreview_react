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

class App extends Component {
  render () {
    return (
      <div>
        <div className={classnames('App', 'App-header')}>
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to joyfulreview!</h2>
        </div>
        <p className="App App-intro">
          reviewing things that bring us <code>JOY</code>
        </p>
        <div>
          <Container>
            <Row>
              <Col sm="3">
                <LeftNav/>
              </Col>
              <Col sm="9">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
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
