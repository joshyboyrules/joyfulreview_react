import React from 'react'
import { Link } from 'react-router-dom'

const SiteMap = (props) => {
  return (
    <div style={{ padding: '15px' }}>
      <div className="row">
        <div className="col-12">
          <h2>Directory</h2>
        </div>
        <div className="col-md-6">
          <ul>
            <li><Link to="/post/51/My-Daily-Driver-Phone-2017">My Daily Driver Phone 2017</Link></li>
            <li><Link to="/post/114/I-Eat-this-Protein-Bar-Everyday">I Eat this Protein Bar Everyday</Link></li>
            <li><Link to="/post/143/My-warm-companion-Zojirushi-stainless-mug">My warm companion: Zojirushi stainless mug</Link></li>
            <li><Link to="/post/173/Men-body-hair-maintenance-products">Men’s body hair maintenance products</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

SiteMap.propTypes = {}
SiteMap.defaultProps = {}

export default SiteMap
