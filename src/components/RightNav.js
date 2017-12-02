import React from 'react'
import Drawer from 'material-ui/Drawer'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import { compose, setDisplayName, lifecycle } from 'recompose'

import debounce from 'lodash/debounce'
import { getHelper } from '../utils/requestHelper'

const searchPosts = debounce((searchValue, updatePosts, categories) => {
  if (searchValue) {
    let stringSearch = `/posts?search=${searchValue}`
    if (categories.length) {
      categories.forEach((category, index) => {
        stringSearch += `&categories[${index}]=${categoryMapper[ category ]}`
      })
    }
    getHelper(stringSearch).then((response) => {
      updatePosts(response.data)
    })
  } else if (categories.length) {
    let stringSearch = '/posts'
    categories.forEach((category, index) => {
      if (index === 0) {
        stringSearch += `?categories[${index}]=${categoryMapper[ category ]}`
      } else {
        stringSearch += `&categories[${index}]=${categoryMapper[ category ]}`
      }
    })
    getHelper(stringSearch).then((response) => {
      updatePosts(response.data)
    })
  } else {
    getHelper(`/posts`).then((response) => {
      updatePosts(response.data)
    })
  }
}, 300)

const categoryMethodHelper = (newCategory, boolean, props) => {
  let newCategories = []
  if (boolean) {
    newCategories = [ newCategory, ...props.categories ]
    props.updateCategories(newCategories)
  } else {
    newCategories = props.categories.filter(category => {
      return category !== newCategory
    })
    props.updateCategories(newCategories)
  }
  searchPosts(props.searchValue, props.updatePosts, newCategories)
}

const categoryMapper = {
  healthBody: '115002',
  gear: '347',
  electronics: '7334',
  guide: '100866'
}

const styles = {
  checked: {
    color: '#F25F5C'
  }
}

const enhance = compose(
  setDisplayName('RightNav'),
  lifecycle({
    componentDidMount: function () {
      console.log('right nav did mount')
      const props = this.props
      searchPosts('', props.updatePosts, props.categories)
    }
  })
)

const RightNav = enhance((props) => {
  return (
    <span>
      {props.drawerOpen &&
      <IconButton onClick={props.handleDrawerClose} style={{ padding: 0, margin: 0 }}>
        <ChevronRightIcon/>
      </IconButton>}
      <Drawer
        type={props.type}
        anchor="right"
        open={props.drawerOpen}
        onRequestClose={() => props.handleDrawerClose()}
      >
        <div
          tabIndex={0}
          role="button"
          style={{ minWidth: '260px' }}>
          <div style={{ minHeight: '4rem', borderBottom: '1px solid lightgrey' }} className={'container'}>
            <div className="row" style={{ minHeight: '4rem' }}>
              <div className="col align-self-center text-center">
                <input
                  autoFocus
                  placeholder={'Search'}
                  className={'form-control'}
                  value={props.searchValue}
                  onChange={(e) => {
                    props.updateSearchValue(e.target.value)
                    searchPosts(e.target.value, props.updatePosts, props.categories)
                  }}/>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12" style={{ paddingLeft: '20px', paddingTop: '20px' }}>
                <span
                  style={{ fontSize: '14px', fontWeight: '500' }}>
                  Categories
                </span>
                <CategorySelector
                  category={'electronics'}
                  categoryName={'Electronics'}
                  {...props}
                />
                <CategorySelector
                  category={'healthBody'}
                  categoryName={'Health & Body'}
                  {...props}
                />
                <CategorySelector
                  category={'gear'}
                  categoryName={'Gear'}
                  {...props}
                />
                <CategorySelector
                  category={'guide'}
                  categoryName={'Guide'}
                  {...props}
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </span>
  )
})

const CategorySelector = (props) => {
  const classes = props.classes
  const category = props.category
  const categoryName = props.categoryName
  const checkedBoolean = props.categories.includes(category)
  return <div className="row" style={{ marginBottom: '-10px' }}>
    <div className="col-2"
         style={{ marginLeft: '-11px', marginRight: '5px' }}>
      <Checkbox
        value={category}
        onChange={(e, boolean) => categoryMethodHelper(e.target.value, boolean, props)}
        checked={checkedBoolean}
        classes={{ checked: classes.checked }}
      />
    </div>
    <div className="col-10">
      <label style={{ paddingTop: '13px', fontSize: '15px' }}
             className={classnames('hover-click', { 'red-text': checkedBoolean })}
             onClick={() => categoryMethodHelper(category, !checkedBoolean, props)}
      >{categoryName}</label>
    </div>
  </div>
}

export default withStyles(styles)(RightNav)
