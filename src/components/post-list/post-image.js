var React = require('react'),
    $     = require('jquery'),
    PostImage;

PostImage = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    previewSource: React.PropTypes.string,
    source: React.PropTypes.string,
    source2: React.PropTypes.string,
    index: React.PropTypes.number
  },
  
  getInitialState: function () {
    return {
      playingMedia: false
    };
  },
  
  render: function () { 
    var img,
        playBtn,
        video;
    
    
    if (this.props.type === 'IMAGE' && !this.props.previewSource) { // Static image
      img = (
        <img src={ this.props.source } />
      );
    } else if (this.props.type === 'IMAGE') { // Gif image
      if (!this.state.playingMedia) { // If media isn't already playing
        img = (
          <img className='media-preview' src={ this.props.previewSource } onClick={ this._toggleMediaState } />
        );
        
        playBtn = (
          <div className='play-media-btn' onClick={ this._toggleMediaState } title={ 'click to play' }>
            <span className='octicon octicon-eye' onClick={ this._toggleMediaState } title={ 'click to play' }></span>
          </div>
        );
      } else { // Media is playing
        img = (
          <img src={ this.props.source } onClick={ this._toggleMediaState } />
        );
        
        playBtn = (
          <div className='play-media-btn' onClick={ this._toggleMediaState } title={ 'click to stop' }>
            <span className='octicon octicon-primitive-square' onClick={ this._toggleMediaState } title={ 'click to stop' }></span>
          </div>
        );
      }
    } else if (this.props.type === 'VIDEO') { // Gifv image
      if (!this.state.playingMedia) { // If media isn't already playing
        img = (
          <img className='media-preview' src={ this.props.previewSource } onClick={ this._toggleMediaState } />
        );
        
        playBtn = (
          <div className='play-media-btn' onClick={ this._toggleMediaState } title={ 'click to play' }>
            <span className='octicon octicon-eye' onClick={ this._toggleMediaState } title={ 'click to play' }></span>
          </div>
        );
      } else {  // Media is playing
        video = (
          <video preload='auto' loop='loop' autoPlay='autoplay' muted='muted' onClick={ this._toggleMediaState } >
            <source src={ this.props.source } type='video/webm' />
            <source src={ this.props.source2 } type='video/mp4' />
          </video>
        );
        
        playBtn = (
          <div className='play-media-btn' onClick={ this._toggleMediaState } title={ 'click to stop' }>
            <span className='octicon octicon-primitive-square' onClick={ this._toggleMediaState } title={ 'click to stop' }></span>
          </div>
        );
      }
    }
    
    return (
      <div className='post-image' key={this.props.index}>
        { img }
        { playBtn }
        { video }
      </div>
    );
  },
  
  /* private Functions
  ---------------------------------------------------------------------------*/
  _toggleMediaState: function (evt) {
    var playing = !this.state.playingMedia;
    
    evt.stopPropagation();
    
    this.setState({
      playingMedia: playing
    });
  },
  
  
});

module.exports = PostImage;