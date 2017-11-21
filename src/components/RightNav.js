import React from 'react'
import Drawer from 'material-ui/Drawer'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'

import debounce from 'lodash/debounce'
import { getHelper } from '../utils/requestHelper'

const searchPosts = debounce((searchValue, updatePosts, categories) => {
  console.log('categories', categories)
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
  electronics: '7334'
}

const RightNav = (props) => {
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
                <strong style={{ fontSize: '16px' }}>Categories</strong><br/>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="electronics"
                        onChange={(e, boolean) => categoryMethodHelper(e.target.value, boolean, props)}
                        checked={props.categories.includes('electronics')}
                      />
                    }
                    label='Electronics'
                  />
                </div>
                <div style={{ marginTop: '-20px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="healthBody"
                        onChange={(e, boolean) => categoryMethodHelper(e.target.value, boolean, props)}
                        checked={props.categories.includes('healthBody')}
                      />
                    }
                    label="Health & Body"
                  />
                </div>
                <div style={{ marginTop: '-20px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="gear"
                        onChange={(e, boolean) => categoryMethodHelper(e.target.value, boolean, props)}
                        checked={props.categories.includes('gear')}
                      />
                    }
                    label='Gear'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </span>
  )
}

export default RightNav
