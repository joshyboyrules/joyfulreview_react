import React from 'react'
import PropTypes from 'prop-types'

import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import YouTube from 'react-youtube'

import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog'

import Slide from 'material-ui/transitions/Slide'

// import ReactDisqusThread from 'react-disqus-thread'

const addOpenCloseState = compose(
  withState('open', 'setOpen', false),
  withProps(({ setOpen }) => ({
    handleOpen: () => setOpen(() => true),
    handleClose: () => setOpen(() => false)
  }))
)

const enhanceYoutubeModal = compose(
  setDisplayName('YouTubeModal'),
  addOpenCloseState
)

function Transition (props) {
  return <Slide direction="up" {...props} />
}

const YouTubeModal = enhanceYoutubeModal((props) => {
  const { title, videoId } = props
  const opts = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  return (
    <div>
      <a href={''} onClick={(e) => {
        e.preventDefault()
        props.handleOpen()
      }}>{title}</a>
      <Dialog
        open={props.open}
        transition={Transition}
        onRequestClose={props.handleClose}
        maxWidth={'md'}
      >
        <DialogContent>
          <YouTube videoId={videoId} opts={opts}/>
        </DialogContent>
      </Dialog>
    </div>
  )
})

YouTubeModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
YouTubeModal.defaultProps = {}

export default YouTubeModal
