import React from 'react'
import YouTube from 'react-youtube'

class MediaPlayer extends React.Component {
  _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
    // event.target.playVideo()
  }

  render () {
    const opts = {
      // height: '390',
      width: '85%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: this.props.autoplay,
      },
    }

    return (
      <YouTube className="media-video"
        videoId={this.props.src}
        opts={opts}
        onReady={this._onReady}
      />
    )
  }
}

export default MediaPlayer
