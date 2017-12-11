import React from 'react'
import { compose, setDisplayName, lifecycle, withState } from 'recompose'
import Meta from '../Meta'
import Time from 'react-time'
import { Twitter, Instagram, Facebook, Mail } from 'react-feather'
import { ShareButtons, ShareCounts } from 'react-share'

import './Post2.css'
import OutsideLink from '../common/OutsideLink/OutsideLink'
import YouTubeModal from '../common/YouTubeModal'
import { trackPage } from '../withTracker'
import { authors } from '../../utils/authors'
import articles from '../../articles'

const { FacebookShareButton, TwitterShareButton, EmailShareButton } = ShareButtons
const { FacebookShareCount } = ShareCounts

const addPostState = compose(
  withState('post', 'setPost', null)
)

const enhance = compose(
  setDisplayName('Post'),
  addPostState,
  lifecycle({
    componentWillMount: function () {
      const id = this.props.match.params.id
      const post = articles[ id ]
      const author = authors[ post.author_id ]
      post.author = author
      this.setState(Object.assign({}, this.state, { post }))
    },
    componentDidMount: function () {
      const page = this.props.location.pathname
      trackPage(page)
    }
  })
)

const Post = enhance((props) => {
  const { post } = props
  const postUrl = `${'https://www.joyfulreview.com'}${props.location.pathname}`

  const postTitle = post.title || ''
  const postContent = post.content || <div>Content not set</div>
  const postExcerpt = post.excerpt || ''
  const featuredImageUrl = post.image || ''
  const author = post.author || {}
  const other = post.other || []
  const buy = post.buy || []
  const youtube = post.youtube || []
  const postPublishedDate = post.published || new Date()

  return (
    <div className={`container-fluid max-container-width MyPost`}>
      <Meta title={`${postTitle} | Joyful Review`} description={postExcerpt} image={featuredImageUrl}/>
      <div className={'row'}>
        <div className="col-md-3">
          <hr/>
          <small>Title</small>
          <h4>{postTitle}</h4>
          <h6 className={'grey-text'}>
            <Time value={postPublishedDate} format="MMM DD"/>
          </h6>
          <hr/>
          <small>Share</small>
          <div className="row">
            <div className="col-3 text-center">
              <FacebookShareButton
                url={postUrl}
                hashtag={'#joyfulreview'}
              >
                <Facebook
                  className={'hover-click facebook-click'}
                  size={30}
                />
                <FacebookShareCount url={postUrl}/>
              </FacebookShareButton>
            </div>
            <div className="col-3 text-center">
              <TwitterShareButton
                url={postUrl}
                title={`${postTitle}`}
                via={`joyfulreview`}
              >
                <Twitter
                  className={'hover-click twitter-click'}
                  size={30}
                />
              </TwitterShareButton>
            </div>
            <div className="col-3 text-center">
              <EmailShareButton url={postUrl}
                                subject={`${postTitle}`}
                                body={postUrl}
              >
                <Mail
                  className={'hover-click email-click'}
                  size={30}
                />
              </EmailShareButton>
            </div>
          </div>
        </div>
        <div className={'col-md-6'}>
          <hr/>
          <small>Article</small>
          <div>
            {postContent}
            <br/><br/><br/>
          </div>
        </div>
        {/* Right Column*/}
        <div className="col-md-3">
          {author && <div>
            <hr/>
            <small>Author</small>
            <div className="row align-items-center no-gutters">
              <div className="col-3">
                <img src={author.image} className={'rounded'} width={'100%'} alt={author.name}/>
              </div>
              <div className="col-9" style={{ paddingLeft: '10px' }}>
                <small className={'bold'}>{author.name}</small>
                <br/>
                <small>{author.position}</small>
                <br/>
                {author.twitter_handle && <span>
                    <Twitter
                      className={'hover-click twitter-click'}
                      onClick={() => {
                        window.open(`https://twitter.com/${author.twitter_handle}`, '_blank')
                      }}
                      size={15}
                    />
                  &nbsp;&nbsp;
                  </span>}
                {author.instagram_handle && <Instagram
                  className={'hover-click instagram-click'}
                  onClick={() => {
                    window.open(`https://instagram.com/${author.twitter_handle}`, '_blank')
                  }}
                  size={15}
                />}
              </div>
            </div>
          </div>}
          {Array.isArray(buy) && buy.length > 0 && <div>
            <hr/>
            <small>Places to Buy</small>
            <br/>
            {buy.map((obj, index) => <div key={index} style={{ paddingTop: '12px' }}>
              <button
                className={'btn btn-joy hover-click'}
                onClick={() => {
                  window.open(obj.link, '_blank')
                }}>{obj.title}</button>
            </div>)}
          </div>}
          {Array.isArray(other) && other.length > 0 && <div>
            <hr/>
            <small>{`Other ${true ? 'Resources' : 'Reviews'}`}</small>
            <br/>
            {other.map((obj, index) => <div key={index}>
              <OutsideLink url={obj.link} text={obj.title}/>
              &nbsp;
              {obj.score && <span>{`(${obj.score})`}</span>}
            </div>)}
          </div>}
          {Array.isArray(youtube) && youtube.length > 0 && <div>
            <hr/>
            <small>YouTube</small>
            <br/>
            {youtube.map((obj, index) => <YouTubeModal
              videoId={obj.youtube_video_id}
              title={obj.title}
              key={index}
            />)}
          </div>}
        </div>
      </div>
    </div>
  )
})

Post.propTypes = {}
Post.defaultProps = {}

export default Post
