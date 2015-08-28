var React       = require('react'),
    PostList    = require('../post-list'),
    CommentList = require('../comment-list'),
    SlideContainer;
    
SlideContainer = React.createClass({
  propTypes: {
    posts:          React.PropTypes.array.isRequired,
    postsError:     React.PropTypes.bool.isRequired,
    showImages:     React.PropTypes.bool.isRequired,
    showNsfwImages: React.PropTypes.bool.isRequired,
    slideOffset:    React.PropTypes.number.isRequired,
    comments:       React.PropTypes.array.isRequired,
    post:           React.PropTypes.object
  },
  
  render: function () {
    var containerStyle = {
          left: this.props.slideOffset + 'px'
        },
        permalink;
    
    if (this.props.post) {
      permalink = this.props.post.permalink;
    }
    
    return (
      <div className='slide-container' style={ containerStyle }>
        <div className='slide-container-panel'>
          <PostList postsError={ this.props.postsError } posts={ this.props.posts } showImages={ this.props.showImages } showNsfwImages={ this.props.showNsfwImages } />
        </div>
        <div className='slide-container-panel comment-panel'>
          <CommentList comments={ this.props.comments } post={ this.props.post } permalink={ permalink } />
        </div>
      </div>
    );
  }
});

module.exports = SlideContainer;