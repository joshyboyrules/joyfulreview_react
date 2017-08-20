import React, { Component } from 'react'
import './App.css'
import { Container, Row, Col } from 'reactstrap'
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
            <h2>[JR] JoyfulReview222</h2>
          </div>
        </Link>
        <br/>
        <div>
          <Container>
            <Row>
              <Col md="2" xs="12">
                <LeftNav/>
              </Col>
              <Col md="10" xs="12">
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/about" component={About}/>
                  <Route path="/post/:id/:title" component={Post}/>
                  <Route component={PageNotFound}/>
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
