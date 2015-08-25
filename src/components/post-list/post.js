var React     = require('react'),
    Util      = require('../../util'),
    PostImage = require('./post-image'),
    Post;

Post = React.createClass({
  propTypes: {
    content:        React.PropTypes.object.isRequired,
    index:          React.PropTypes.number.isRequired,
    showImages:     React.PropTypes.bool.isRequired,
    showNsfwImages: React.PropTypes.bool.isRequired
  },
  
  render: function () {
    var timePassed = Util.getReadableTimePassed(this.props.content.created_utc),
        media      = Util.getMedia(this.props.content),
        nsfw,
        img;
        
    if (this.props.showImages && media.type && media.type !== 'GALLERY' && (this.props.showNsfwImages || !this.props.content.over_18)) {
      img = (
        <PostImage type={media.type} previewSource={ media.previewSource } source={ media.source } source2={ media.source2 } />
      );
    }
    
    if (this.props.content.over_18) {
      nsfw = (<span className='nsfw-tag'>NSFW</span>);
    }
    
    return (
      <div className='post-item'>
        <a className='post-item-details' href={ this.props.content.url }>
          <div className='post-item-number'>{ this.props.index + 1 }</div>
          <div className='post'>
            <div className='post-title'>{ this.props.content.title }</div>
            { nsfw }
            <div className='post-url'>{ Util.getShortPrettyStr(this.props.content.url, 45) }</div>
            <span className='post-meta'>
              <span className='meta-part'>{ this.props.content.score } points by { this.props.content.author } to /r/{ this.props.content.subreddit }&nbsp;</span>
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