import React from 'react'
import { compose, setDisplayName } from 'recompose'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import Time from 'react-time'
import Divider from 'material-ui/Divider'

const enhancePosts = compose(
  setDisplayName('Home')
)

const Home = enhancePosts((props) => {
  const posts = props.posts
  return (
    <div className={'row'}>
      {posts.map((post, index) => {
        const title = post.title.rendered.replace(/ |&nbsp;/g, '-')
        return (
          <Link
            to={`/post/${post.id}/${title}`}
            style={{ textDecoration: 'none', color: 'black' }}
            key={index}
            className={'col-12 col-md-6'}>
            <div style={{ width: '100%', padding: '15px' }}>
              <Divider/><br/>
              <h3>{renderHTML(post.title.rendered)}</h3>
              <h6 className={'text-muted'}>
                <Time value={post.date_gmt} format="MM/DD/YYYY"/>
              </h6>
              <span>{renderHTML(post.excerpt.rendered)}</span>
            </div>
            <br className={'d-block d-sm-block d-md-none'}/>
          </Link>)
      })}
    </div>
  )
})

Home.propTypes = {}
Home.defaultProps = {}

export default Home
