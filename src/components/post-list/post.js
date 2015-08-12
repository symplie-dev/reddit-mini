var React     = require('react'),
    Util      = require('../../util'),
    PostImage = require('./post-image'),
    Post;

Post = React.createClass({
  propTypes: {
    content: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    showImages: React.PropTypes.bool.isRequired
  },
  
  render: function () {
    var timePassed = Util.getReadableTimePassed(this.props.content.created_utc),
        source     = Util.getPreviewImgUrl(this.props.content),
        preview,
        img;
    
    if (this.props.content.preview && this.props.content.preview.images &&
        this.props.content.preview.images[0] && this.props.content.preview.images[0].source &&
        this.props.content.preview.images[0].source.url) {
      preview = this.props.content.preview.images[0].source.url;
    }
        
    if (this.props.showImages && source && preview) {
      img = <PostImage preview={preview} source={ source } />;
    }
    
    
    
    return (
      <div className='post-item'>
        <a className='post-item-details' href={ this.props.content.url }>
          <div className='post-item-number'>{ this.props.index + 1 }</div>
          <div className='post'>
            <div className='post-title'>{ this.props.content.title }</div>
            <div className='post-url'>{ Util.getShortPrettyStr(this.props.content.url, 45) }</div>
            <span className='post-meta'>
              <span className='meta-part'>{ this.props.content.score } points by { this.props.content.author }&nbsp;</span>
              <span className='meta-part'>{ timePassed } ago · { this.props.content.num_comments } comments</span>
            </span>
          </div>
        </a>
        <a className='comments-link' href= {'http://www.reddit.com' + this.props.content.permalink }>
          <span className='octicon octicon-comment-discussion'></span>
        </a>
        { img }
      </div>
    );
  }
});

module.exports = Post;