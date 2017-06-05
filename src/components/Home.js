import React from 'react'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import { getHelper } from '../utils/requestHelper'
import { Button } from 'reactstrap'

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
  return (
    <pre>
      {JSON.stringify(props.posts, undefined, 2)}
    </pre>
  )
})

const Home = (props) => {
  return (
    <div>
      <Button color="danger">Classic</Button>
      <Posts/>
    </div>
  )
}

Home.propTypes = {}
Home.defaultProps = {}

export default Home
