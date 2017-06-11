import React from 'react'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import { getHelper } from '../utils/requestHelper'
import {
  Card, CardBlock,
  CardTitle, CardSubtitle, Row, Col, Container
} from 'reactstrap'
import renderHTML from 'react-render-html'
import classnames from 'classnames'
import debounce from 'lodash/debounce'

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

const enhancePosts = compose(
  addPostsState,
  setDisplayName('Posts'),
  lifecycle({
    componentWillMount: function () {
      getHelper(`/posts`).then((response) => {
        this.props.updatePosts(response.data)
      })
    }
  }),
  addSearchState
)

const searchPosts = debounce((searchValue, updatePosts) => {
  if (searchValue) {
    getHelper(`/posts?search=${searchValue}`).then((response) => {
      updatePosts(response.data)
    })
  } else {
    getHelper(`/posts`).then((response) => {
      updatePosts(response.data)
    })
  }
}, 1000)

const Posts = enhancePosts((props) => {
  const { posts } = props
  return (
    <div>
      <Container>
        <Row>
          <Col md="12">
            <input className="form-control" placeholder="search something..."
                   value={props.searchValue}
                   onChange={(e) => {
                     const searchValue = e.target.value
                     props.updateSearchValue(searchValue)
                     searchPosts(searchValue, props.updatePosts)
                   }}
            />
            <br/>
          </Col>
        </Row>
        <Row>
          {posts.map((post, index) => {
            // console.log(post)
            return (
              <Col md="4" key={index}>
                <Card className={classnames('hover-click', 'hover-card')}>
                  <CardBlock>
                    <CardTitle>{renderHTML(post.title.rendered)}</CardTitle>
                    <CardSubtitle>
                      <small>{post.date}</small>
                    </CardSubtitle>
                    {renderHTML(post.excerpt.rendered)}
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
