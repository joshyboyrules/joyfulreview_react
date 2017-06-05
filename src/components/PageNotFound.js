import React from 'react'
import classnames from 'classnames'

const PageNotFound = (props) => {
  const { className } = props
  return (
    <div className={classnames('PageNotFound', className)}>
      <h1>PageNotFound section</h1>
      <p>This is the PageNotFound section, why joyful review is amazing</p>
    </div>
  )
}

PageNotFound.propTypes = {}
PageNotFound.defaultProps = {}

export default PageNotFound
