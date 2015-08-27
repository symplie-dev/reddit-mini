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
    comments:       React.PropTypes.array.isRequired
  },
  
  render: function () {
    var containerStyle = {
      left: this.props.slideOffset + 'px'
    };
    
    return (
      <div className='slide-container' style={ containerStyle }>
        <div className='slide-container-panel'>
          <PostList postsError={ this.props.postsError } posts={ this.props.posts } showImages={ this.props.showImages } showNsfwImages={ this.props.showNsfwImages } />
        </div>
        <div className='slide-container-panel'>
          <CommentList comments={ this.props.comments } />
        </div>
      </div>
    );
  }
});

module.exports = SlideContainer;