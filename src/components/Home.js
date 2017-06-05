import React from 'react'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import { getHelper } from '../utils/requestHelper'
import {
  Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Row, Col, Container, Button
} from 'reactstrap'
import renderHTML from 'react-render-html'
import classnames from 'classnames'

const addPostsState = compose(
  withState('posts', 'setPosts', []),
  withProps(({ setPosts }) => ({
    updatePosts: (posts) => setPosts(() => posts)
  }))
)

const enhancePosts = compose(
  addPostsState,
  setDisplayName('Posts'),
  lifecycle({
    componentWillMount: function () {
      getHelper('/posts').then((response) => {
        console.log(response)
        this.props.updatePosts(response.data)
      })
    }
  })
)

const Posts = enhancePosts((props) => {
  const { posts } = props
  return (
    <div>
      <Container>
        <Row>
          {posts.map((post, index) => {
            console.log(post)
            return (
              <Col md="4" key={index}>
                <Card className={classnames('hover-click', 'hover-card')}>
                  <CardBlock>
                    <CardTitle>{renderHTML(post.title.rendered)}</CardTitle>
                    <CardSubtitle><small>{post.date}</small></CardSubtitle>
                    {renderHTML(post.excerpt.rendered)}
                    <Button>Button</Button>
                  </CardBlock>
                </Card>
              </Col>)
          })}
        </Row>
      </Container>
    </div>
  )
})

const Home = (props) => {
  return (
    <div>
      <Posts/>
    </div>
  )
}

Home.propTypes = {}
Home.defaultProps = {}

export default Home
