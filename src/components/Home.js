import React from 'react'
import { compose, setDisplayName, lifecycle } from 'recompose'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import Time from 'react-time'
import Divider from 'material-ui/Divider'
import Meta from './Meta'
import { trackPage } from './withTracker'

const enhance = compose(
  setDisplayName('Home'),
  lifecycle({
    componentDidMount: function () {
      const page = this.props.location.pathname
      trackPage(page)
    }
  })
)

const Home = enhance((props) => {
  const posts = props.posts
  return (
    <div className={'container-fluid max-container-width'}>
      <Meta title={`Joyful Review`} description={`reviewing the things in life that bring joy`}/>
      <div className="row">
        {posts.map((post, index) => {
          return <div
            className={'col-sm-12 col-md-6 col-lg-6 col-xl-4'}
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

const postTitleHelper = (title) => {
  let string = title.replace(/ |&nbsp;/g, '-')
  string = string.replace(/:/g, '')
  string = string.replace(/&#8217;s/g, '')
  return string
}

const IndividualPost = enhanceIndividualPost((props) => {
  const { post } = props

  const title = postTitleHelper(post.title.rendered)
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
