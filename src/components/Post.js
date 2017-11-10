import React from 'react'
import { compose, setDisplayName, lifecycle, withState } from 'recompose'
import { getHelper } from '../utils/requestHelper'
import isEmpty from 'lodash/isEmpty'
import renderHTML from 'react-render-html'
// import ReactDisqusThread from 'react-disqus-thread'
import Meta from './Meta'
import Time from 'react-time'
import { Twitter, Instagram } from 'react-feather'

import { convertHtmlToString } from '../utils/utils'

function stripHtml (string) {
  let string2 = string.replace(/<(?:.|\n)*?>/gm, '') //strip html
  string2 = string2.replace(/“|”/g, '"') // replace bad quotation marks
  return string2
}

function getJsonFromTag (tagString) {
  // const renderedHtml = renderHTML(html)
  const element = document.getElementById(tagString)
  let json = null
  if (element) {
    json = Object.assign({}, JSON.parse(stripHtml(element.innerHTML)))
    const baseFilePrefix = 'https://'

    Object.keys(json).forEach(function (key) {
      if (key === 'image' || key === 'link') {
        json[ key ] = baseFilePrefix + json[ key ]
      }
    })
  }
  return json
}

const addPostState = compose(
  withState('post', 'setPost', null),
  withState('author', 'setAuthor', null),
  withState('buy', 'setBuy', null)
)

const enhance = compose(
  setDisplayName('Post'),
  addPostState,
  lifecycle({
    componentDidMount: function () {
      const id = this.props.match.params.id
      getHelper(`/posts/${id}`).then((response) => {
        const post = response.data
        // this.props.updatePost(response.data)
        this.setState(Object.assign({}, this.state, { post }))
        const author = getJsonFromTag('author')
        const buy = getJsonFromTag('buy')

        this.setState(Object.assign({}, this.state, { author, buy }))
      })
    },
    componentWillUnmount: function () {
      // console.log('post unmounted')
    }
  })
)

const Post = enhance((props) => {
  const { post, author, buy } = props

  if (isEmpty(post)) {
    return <div/>
  } else {
    const title = post.title.rendered.replace(/&nbsp;/g, ' ')
    const excerpt = convertHtmlToString(post.excerpt.rendered)
    const featuredImageUrl = post.featured_media_url
    return (
      <div className={'container-fluid max-container-width'}>
        <Meta title={`${title} | Joyful Review`} description={excerpt}/>
        <div className={'row'}>
          <div className="col-md-3">
            <hr/>
            <small>Title</small>
            {featuredImageUrl && <img src={featuredImageUrl} width={'100%'} className={'rounded'} alt={title}/>}
            <h4>{renderHTML(post.title.rendered)}</h4>
            <h6 className={'text-muted'}>
              Published: <Time value={post.date_gmt} format="MM/DD/YYYY"/>
            </h6>
          </div>
          <div className={'col-md-6'}>
            <hr/>
            <small>Article</small>
            <div>
              {renderHTML(post.content.rendered)}
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
                  <small><strong>{author.name}</strong></small>
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
            {buy && <div>
              <hr/>
              <small>Places to Buy</small>
              <br/>
              <a href={buy.link} target={'_blank'}>Link</a>
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
