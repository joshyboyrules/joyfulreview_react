import React from 'react'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import Time from 'react-time'
import Divider from 'material-ui/Divider'
import Meta from './Meta'

const enhancePosts = compose(
  setDisplayName('Home'),
  withState('updatedPosts', 'setUpdatedPosts', []),
  withProps(({ setUpdatedPosts }) => ({
    setUpdatedPosts: (posts) => setUpdatedPosts(() => posts)
  })),
  lifecycle({
    componentWillUnmount: function () {
      console.log('home unmounted')
    },
    componentDidMount: function () {
      console.log('home mounted')
    }
  })
)

const Home = enhancePosts((props) => {
  const posts = props.posts

  return (
    <div className={'container-fluid max-container-width'}>
      <Meta title={`Joyful Review`} description={`reviewing the things in life that bring joy`}/>
      <div className="row">
        {posts.map((post, index) => {
          return <div
            className={'col-sm-12 col-md-6 col-lg-4 col-xl-3'}
            key={post.id}
            id={`post-${post.id}`}
          >
            <IndividualPost post={post}/>
          </div>
        })}
      </div>
    </div>
  )
})

const enhanceIndividualPost = compose(
  setDisplayName('IndividualPost')
)

const IndividualPost = enhanceIndividualPost((props) => {
  const { post } = props

  let title = post.title.rendered.replace(/ |&nbsp;/g, '-')
  title = title.replace(/:/g, '')
  const featuredImageUrl = post.featured_media_url

  return (
    <Link
      onClick={() => {
        console.log('ON CLICK POST !!!!')
      }}
      to={`/post/${post.id}/${title}`}
      style={{ textDecoration: 'none', color: 'black' }}>
      <div style={{ width: '100%', padding: '15px' }}>
        <Divider/><br/>
        {featuredImageUrl && <img src={featuredImageUrl} width={'100%'} className={'rounded'} alt={title}/>}
        <h3>{renderHTML(post.title.rendered)}</h3>
        <h6 className={'text-muted'}>
          <Time value={post.date_gmt} format="MM/DD/YYYY"/>
        </h6>
        <span>{renderHTML(post.excerpt.rendered)}</span>
      </div>
      <br className={'d-block d-sm-block d-md-none'}/>
    </Link>
  )
})

Home.propTypes = {}
Home.defaultProps = {
  updatedPosts: []
}

export default Home
