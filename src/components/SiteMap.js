import React from 'react'
import { Link } from 'react-router-dom'
import { compose, setDisplayName, lifecycle } from 'recompose'
import { trackPage } from './withTracker'

const enhance = compose(
  setDisplayName('SiteMap'),
  lifecycle({
    componentDidMount: function () {
      const page = this.props.location.pathname
      trackPage(page)
    }
  })
)

const SiteMap = enhance((props) => {
  return (
    <div style={{ padding: '15px' }}>
      <div className="row">
        <div className="col-12">
          <h2>Sitemap</h2>
        </div>
        <div className="col-md-6">
          <ul>
            <li><Link to="/post/5/freezing-your-credit">Freezing your Credit</Link></li>
            <li><Link to="/post/4/mens-hair-maintenance-products">Men’s body hair maintenance products</Link></li>
            <li><Link to="/post/3/my-warm-companion-zojirushi-stainless-mug">My warm companion: Zojirushi stainless mug</Link></li>
            <li><Link to="/post/2/i-eat-this-protein-bar-everyday">I Eat this Protein Bar Everyday</Link></li>
            <li><Link to="/post/1/my-daily-driver-phone-2017">My Daily Driver Phone 2017</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
})

SiteMap.propTypes = {}
SiteMap.defaultProps = {}

export default SiteMap
