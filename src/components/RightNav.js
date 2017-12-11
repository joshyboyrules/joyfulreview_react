import React from 'react'
import Drawer from 'material-ui/Drawer'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import { compose, setDisplayName, lifecycle } from 'recompose'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import intersection from 'lodash/intersection'
import toLower from 'lodash/toLower'

import articles from '../articles'

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

export const searchPosts = debounce((searchValue, updatePosts, categories) => {
  let posts = cloneDeep(values(articles))

  // category filtering
  posts = posts.filter(post => intersection(post.categories, categories).length)

  // searching
  const lowerCaseSearchValue = toLower(searchValue)
  if (lowerCaseSearchValue) {
    posts = posts.filter(post => {
      return post.stringifyContent.indexOf(lowerCaseSearchValue) !== -1
    })
  }

  // sorting
  posts = reverse(sortBy(values(posts), 'published')) // poor performance

  updatePosts(posts)
}, 0)

const styles = { checked: { color: '#F25F5C' } }

const enhance = compose(
  setDisplayName('RightNav'),
  lifecycle({
    componentWillMount: function () {
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
