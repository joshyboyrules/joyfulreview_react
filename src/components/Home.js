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
    // componentWillMount: function () {
    //
    //   // (adsbygoogle = window.adsbygoogle || []).push({});
    //   console.log('home did mount')
    //   // console.log('window width', window.innerWidth)
    //   this.props.posts.forEach(post => {
    //     const postHeight = document.getElementById(`post-${post.id}`).clientHeight
    //     const postWidth = document.getElementById(`post-${post.id}`).clientWidth
    //     let pictureHeight = 0
    //     const postImageUrl = post.featured_media_url
    //     // const pictureHeight = (post.featured_media_url) ? parseInt(): 0
    //     if (postImageUrl) {
    //       // console.log('image url', postImageUrl)
    //       const pictureHeightDimension = parseInt(postImageUrl.substring(postImageUrl.indexOf('hh') + 2, postImageUrl.lastIndexOf('hh')), 10)
    //       const pictureWidthDimension = parseInt(postImageUrl.substring(postImageUrl.indexOf('ww') + 2, postImageUrl.lastIndexOf('ww')), 10)
    //       // console.log(`picture height dimension: ${pictureHeightDimension}, picture width dimension: ${pictureWidthDimension}`)
    //       const multiplier = parseInt(pictureWidthDimension / postWidth, 10)
    //       // console.log('multiplier', multiplier)
    //       pictureHeight = parseInt(pictureHeightDimension / multiplier, 10)
    //       // console.log('picture height', pictureHeight)
    //     }
    //     // console.log(`post: ${post.id} height: ${postHeight} width: ${postWidth}`)
    //     const totalHeight = (pictureHeight && pictureHeight > postHeight) ? postHeight + pictureHeight : postHeight
    //     post.height = totalHeight
    //   })
    //
    //   const leftArray = []
    //   const rightArray = []
    //
    //   let leftHeight = 0
    //   let rightHeight = 0
    //   // let maxHeight = clonedPosts.length ? clonedPosts[0].height : 0
    //
    //   const clonedPosts = cloneDeep(this.props.posts)
    //
    //   clonedPosts.forEach((post, index) => {
    //     // console.log('post', post)
    //     const postHeight = post.height
    //     // console.log(`postHeight: ${postHeight}, leftHeight: ${leftHeight}, rightHeight: ${rightHeight}`)
    //     if (index === 0) {
    //       leftHeight += postHeight
    //       leftArray.push(post)
    //     } else if (leftHeight <= rightHeight) {
    //       leftHeight += postHeight
    //       leftArray.push(post)
    //     } else {
    //       rightHeight += postHeight
    //       rightArray.push(post)
    //     }
    //   })
    //
    //   // console.log('array', array)
    //   // console.log('left array', leftArray)
    //   // console.log('right array', rightArray)
    //   // this.props.setUpdatedPosts([ leftArray, rightArray ])
    // }
  })
)

const Home = enhancePosts((props) => {
  const posts = props.posts
  const updatedPosts = props.updatedPosts

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
      {/*<MediaQuery minWidth={720}>*/}
      {/*<div className={'row'}>*/}
      {/*{leftArray &&*/}
      {/*<div className="col-12 col-md-6">*/}
      {/*{leftArray.map(post => <IndividualPost post={post} key={post.id}/>)}*/}
      {/*</div>}*/}
      {/*{rightArray &&*/}
      {/*<div className="col-12 col-md-6">*/}
      {/*{rightArray.map(post => <IndividualPost post={post} key={post.id}/>)}*/}
      {/*</div>}*/}
      {/*{!leftArray && !rightArray && <div>*/}
      {/*{posts.map((post, index) => {*/}
      {/*return <div*/}
      {/*className={'col-12 col-md-6 offset-md-6'}*/}
      {/*key={post.id}*/}
      {/*id={`post-${post.id}`}*/}
      {/*style={{ visibility: 'hidden' }}*/}
      {/*>*/}
      {/*<IndividualPost post={post}/>*/}
      {/*</div>*/}
      {/*})}*/}
      {/*</div>}*/}
      {/*</div>*/}
      {/*</MediaQuery>*/}
      {/*<MediaQuery maxWidth={719}>*/}
      {/*{posts.map(post => {*/}
      {/*return <div*/}
      {/*className={'col-12'}*/}
      {/*key={post.id}*/}
      {/*id={`post-${post.id}`}*/}
      {/*>*/}
      {/*<IndividualPost post={post}/>*/}
      {/*</div>*/}
      {/*})}*/}
      {/*</MediaQuery>*/}
    </div>
  )
})

const enhanceIndividualPost = compose(
  setDisplayName('IndividualPost')
)

// you create col-6
// first post col is set to max height
// current height set to 0
// when current height > max height, create new col-6

const IndividualPost = enhanceIndividualPost((props) => {
  const { post } = props

  const title = post.title.rendered.replace(/ |&nbsp;/g, '-')
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
