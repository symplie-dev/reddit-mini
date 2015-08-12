var React = require('react'),
    $     = require('jquery'),
    PostImage;

PostImage = React.createClass({
  propTypes: {
    preview: React.PropTypes.string,
    source: React.PropTypes.string,
    index: React.PropTypes.number
  },
  
  render: function () {
    var img, playBtn;
    
    if (this.props.source.split('.').pop() === 'gif') {
      img = (<img className='gif-preview' src={ this.props.preview } onClick={ this._toggleGif }/>);
      playBtn = (<div className='gif-play-btn' onClick={  this._toggleGif}><span className='octicon octicon-triangle-right'></span></div>);
    } else {
      img = (<img src={ this.props.source } />);
    }
    
    return (
      <div className='post-image' key={this.props.index}>
        { img }
        { playBtn }
      </div>
    );
  },
  
  /* private Functions
  ---------------------------------------------------------------------------*/
  _toggleGif: function (evt) {
    if (evt.target.src.split('.').pop() === 'gif') {
      $(evt.target).attr('src', this.props.preview)
                   .parent().children().find('.octicon').removeClass('octicon-x').addClass('octicon-triangle-right');
      
    } else {
      $(evt.target).attr('src', this.props.source)
                   .parent().children().find('.octicon').removeClass('octicon-triangle-right').addClass('octicon-x');
    }
  }
});

module.exports = PostImage;