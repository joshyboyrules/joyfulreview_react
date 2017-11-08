import React from 'react'
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import { getHelper } from '../utils/requestHelper'
import isEmpty from 'lodash/isEmpty'
import renderHTML from 'react-render-html'
// import ReactDisqusThread from 'react-disqus-thread'
import Meta from './Meta'
import { convertHtmlToString } from '../utils/utils'

const addPostState = compose(
  withState('post', 'setPost', {}),
  withProps(({ setPost }) => ({
    updatePost: (post) => setPost(() => post)
  }))
)

const enhance = compose(
  setDisplayName('Post'),
  addPostState,
  lifecycle({
    componentWillMount: function () {
      const id = this.props.match.params.id
      getHelper(`/posts/${id}`).then((response) => {
        this.props.updatePost(response.data)
      })
    }
  })
)

const Post = enhance((props) => {
  const { post } = props

  if (isEmpty(post)) {
    return <div/>
  } else {
    const title = post.title.rendered.replace(/&nbsp;/g, ' ')
    const excerpt = convertHtmlToString(post.excerpt.rendered)
    return (
      <div className={'container'}>
        <Meta title={title} description={excerpt}/>
        <div className={'row'}>
          <div className={'col-md-12'}>
            <h1>{renderHTML(post.title.rendered)}</h1>
            <div>
              {renderHTML(post.content.rendered)}
            </div>
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
