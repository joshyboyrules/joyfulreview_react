import React from 'react'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import { getHelper } from '../utils/requestHelper'
import renderHTML from 'react-render-html'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'
import Time from 'react-time'

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
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-md-12'}>
            <input className="form-control" placeholder="search something..."
                   value={props.searchValue}
                   onChange={(e) => {
                     const searchValue = e.target.value
                     props.updateSearchValue(searchValue)
                     searchPosts(searchValue, props.updatePosts)
                   }}
            />
            <br/>
          </div>
        </div>
        <div className={'row'}>
          {posts.map((post, index) => {
            const title = post.title.rendered.replace(/ /g, '-')
            console.log(post)
            return (
              <Link
                to={`/post/${post.id}/${title}`}
                style={{ textDecoration: 'none', color: 'black' }}
                key={index}
                className={'col-md-4'}>
                <div className="card" style={{ width: '100%' }}>
                  <div className="card-body">
                    <h4 className="card-title">{post.title.rendered}</h4>
                    <h6 className={'text-muted'}>
                      <Time value={post.date_gmt} format="MM/DD/YYYY"/>
                    </h6>
                    <span className="card-text">
                      {renderHTML(post.excerpt.rendered)}
                      </span>
                    {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                  </div>
                </div>
                <br className="hidden-md-up"/>
              </Link>)
          })}
        </div>
      </div>
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
