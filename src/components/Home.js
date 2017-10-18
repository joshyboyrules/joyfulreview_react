import React from 'react'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import { getHelper } from '../utils/requestHelper'
import renderHTML from 'react-render-html'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'
import Time from 'react-time'
import Divider from 'material-ui/Divider'

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
    <div className={'row'}>
      {posts.map((post, index) => {
        const title = post.title.rendered.replace(/ /g, '-')
        return (
          <Link
            to={`/post/${post.id}/${title}`}
            style={{ textDecoration: 'none', color: 'black' }}
            key={index}
            className={'col-12 col-md-4'}>
            <div style={{ width: '100%', padding: '15px' }}>
              <Divider/><br/>
              <h4 className="lora-font">{post.title.rendered}</h4>
              {/*<h6 className={'text-muted roboto-font'}>*/}
                {/*<Time value={post.date_gmt} format="MM/DD/YYYY"/>*/}
              {/*</h6>*/}
              <span>{renderHTML(post.excerpt.rendered)}</span>
            </div>
            <br className={'d-block d-sm-block d-md-none'}/>
          </Link>)
      })}
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
