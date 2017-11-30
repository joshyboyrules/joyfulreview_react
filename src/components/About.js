import React from 'react'
import classnames from 'classnames'
import Meta from './Meta'
import { compose, setDisplayName, lifecycle } from 'recompose'
import { trackPage } from './withTracker'

const enhance = compose(
  setDisplayName('About'),
  lifecycle({
    componentDidMount: function () {
      const page = this.props.location.pathname
      trackPage(page)
    }
  })
)

const About = enhance((props) => {
  const { className } = props
  return (
    <div className={classnames('About', className)} style={{ padding: '15px' }}>
      <Meta title={`Joyful Review About Page`} description={`Joyful review is the best!`}/>
      <h1>About section</h1>
      <p>another change :)!</p>
      <p>This is the about section, why joyful review is amazing</p>
    </div>
  )
})

About.propTypes = {}
About.defaultProps = {}

export default About
