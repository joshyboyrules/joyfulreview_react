import React from 'react'
import { compose, setDisplayName, lifecycle, withState } from 'recompose'
import isEmpty from 'lodash/isEmpty'
import renderHTML from 'react-render-html'
import Meta from '../Meta'
import Time from 'react-time'
import { Twitter, Instagram, Facebook, Mail } from 'react-feather'
import values from 'lodash/values'
import isObject from 'lodash/isObject'
import { ShareButtons, ShareCounts } from 'react-share'

import './Post.css'
import { getHelper } from '../../utils/requestHelper'
import OutsideLink from '../common/OutsideLink/OutsideLink'
import { convertHtmlToString } from '../../utils/utils'
import YouTubeModal from '../common/YouTubeModal'
import { trackPage } from '../withTracker'
import { authors } from '../../utils/authors'

// import draftContent from '../articles/draft_article'

const { FacebookShareButton, TwitterShareButton, EmailShareButton } = ShareButtons
const { FacebookShareCount } = ShareCounts

function stripHtml (string) {
  let string2 = string.replace(/<(?:.|\n)*?>/gm, '') //strip html
  string2 = string2.replace(/“|”|″/g, '"') // replace bad quotation marks
  return string2
}

function getJsonFromTag (tagString) {

  const jsonHelper = (json) => {
    const prefix = 'https://'

    Object.keys(json).forEach(function (key) {
      if (key === 'image' || key === 'link') {
        json[ key ] = prefix + json[ key ]
      }
    })
  }

  const element = document.getElementById(tagString)
  let json = null
  if (element) {
    json = Object.assign({}, JSON.parse(stripHtml(element.innerHTML)))
    jsonHelper(json)
  }
  if (tagString === 'author') {
    const author_id = json && json.author_id ? json.author_id : null
    return author_id ? authors[ author_id ] : authors[ 1 ]
  } else if (tagString === 'buy' || tagString === 'other-reviews' || tagString === 'youtube') {
    if (json) {
      json = values(json)
      json.forEach(obj => {
        if (isObject(obj)) {
          jsonHelper(obj)
        }
      })
    }
  }

  return json
}

const addPostState = compose(
  withState('post', 'setPost', null),
  withState('author', 'setAuthor', null),
  withState('buy', 'setBuy', null),
  withState('otherReviews', 'setOtherReviews', null),
  withState('youtube', 'setYouTube', null)
)

const enhance = compose(
  setDisplayName('Post'),
  addPostState,
  lifecycle({
    componentWillMount: function () {

      const firstPromise = new Promise((resolve, reject) => {
        const id = this.props.match.params.id
        if (id === 'draft') {
          const post = { content: { rendered: 'draftContent' }, title: { rendered: 'draft mode' } }
          this.setState(Object.assign({}, this.state, { post }))
          resolve()
        } else {
          getHelper(`/posts/${id}`).then((response) => {
            const post = response.data
            this.setState(Object.assign({}, this.state, { post }))
            resolve()
          })
        }
      })

      firstPromise.then(() => {
        const author = getJsonFromTag('author')
        const buy = getJsonFromTag('buy')
        const otherReviews = getJsonFromTag('other-reviews')
        const youtube = getJsonFromTag('youtube')
        this.setState(Object.assign({}, this.state, { author, buy, otherReviews, youtube }))
      })

      const page = this.props.location.pathname
      trackPage(page)
    }
  })
)

const Post = enhance((props) => {
  const { post, author, buy, otherReviews, youtube } = props
  const basePath = 'https://www.joyfulreview.com'
  const pathname = props.location.pathname
  const postUrl = `${basePath}${pathname}`

  const isGuideBoolean = post && Array.isArray(post.categories) && post.categories.includes(100866)

  if (isEmpty(post)) {
    return <div/>
  } else {
    const title = post && post.title && post.title.rendered ? post.title.rendered.replace(/&nbsp;/g, ' ') : 'N/A'
    const excerpt = post && post.excerpt && post.excerpt.rendered ? convertHtmlToString(post.excerpt.rendered) : 'N/A'
    const featuredImageUrl = post.featured_media_url
    return (
      <div className={`container-fluid max-container-width MyPost`}>
        <Meta title={`${title} | Joyful Review`} description={excerpt} image={featuredImageUrl}/>
        <div className={'row'}>
          <div className="col-md-3">
            <hr/>
            <small>Title</small>
            <h4>{renderHTML(post.title.rendered)}</h4>
            <h6 className={'grey-text'}>
              <Time value={post.date_gmt || new Date()} format="MMM DD"/>
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
                  title={`${renderHTML(post.title.rendered)} from joyfulreview`}
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
                                  subject={`${renderHTML(post.title.rendered)} from joyfulreview`}
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
              {renderHTML(post.content.rendered)}
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
            {Array.isArray(otherReviews) && otherReviews.length > 0 && <div>
              <hr/>
              <small>{`Other ${isGuideBoolean ? 'Resources' : 'Reviews'}`}</small>
              <br/>
              {otherReviews.map((obj, index) => <div key={index}>
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
          {/*<div className="col-md-12">*/}
          {/*<ReactDisqusThread shortname="joyfulreview"*/}
          {/*identifier={`${post.id}`}*/}
          {/*url={`https://www.joyfulreview.com${props.location.pathname}`}/>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
})

Post.propTypes = {}
Post.defaultProps = {}

export default Post
