import React from 'react'
import { compose, setDisplayName, lifecycle } from 'recompose'
import { Link } from 'react-router-dom'
import Time from 'react-time'
import Divider from 'material-ui/Divider'
import Meta from '../Meta'
import { trackPage } from '../withTracker'
import './Home2.css'
import { searchPosts } from '../RightNav'
import toLower from 'lodash/toLower'

const enhance = compose(
  setDisplayName('Home'),
  lifecycle({
    componentDidMount: function () {
      const page = this.props.location.pathname
      trackPage(page)

      const props = this.props
      searchPosts('', props.updatePosts, props.categories)
    }
  })
)

const Home = enhance((props) => {
  const posts = props.posts
  return (
    <div className={'container-fluid max-container-width Home'}>
      <Meta title={`Joyful Review`} description={`reviewing the things in life that bring joy`}/>
      <div className="row">
        {posts && posts.map((post, index) => {
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
  string = string.replace(/'/g, '')
  string = toLower(string)
  return string
}

const IndividualPost = enhanceIndividualPost((props) => {
  const { post } = props

  const title = post.title || ''
  const image = post.image || ''
  const postExcerpt = post.excerpt || <div/>

  return (
    <Link to={`/post/${post.id}/${postTitleHelper(title)}`} className={'home-post'}>
      <div style={{ width: '100%', padding: '15px' }}>
        <div>
          <Divider/>
        </div>
        <div style={{ paddingTop: '15px' }}>
          {image && <img src={image} width={'100%'} className={'rounded'} alt={title}/>}
        </div>
        <div style={{ paddingTop: '15px', paddingRight: '15px', paddingLeft: '15px' }}>
          <div style={{ color: '#000', fontWeight: '400', fontSize: '22px' }}>
            {title}
          </div>
          <div className={'grey-text'} style={{ fontSize: '15px' }}>
            {postExcerpt}
          </div>
          <div
            style={{ fontSize: '14px', color: 'rgba(0,0,0,0.54)', paddingTop: '1rem' }}
            className={'home-post-date post-section-header'}>
            <Time value={post.published} format="MMM DD"/>
          </div>
        </div>
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
