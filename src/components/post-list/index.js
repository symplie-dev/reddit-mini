var React         = require('react'),
    Post          = require('./post'),
    PostsStore    = require('../../stores/posts'),
    SettingsStore = require('../../stores/settings'),
    PostList;

PostList = React.createClass({
  propTypes: {
    posts:          React.PropTypes.array.isRequired,
    showImages:     React.PropTypes.bool.isRequired,
    showNsfwImages: React.PropTypes.bool.isRequired
  },
  
  render: function () {
    var self = this,
        posts,
        loading;
    
    if (self.props.posts.length > 0) {
      posts = [];
      
      this.props.posts.forEach(function (item, index) {
        posts.push(
          <li key={ index }>
            <Post content={ item.data } index={ index } showImages={ self.props.showImages } showNsfwImages={ self.props.showNsfwImages } />
          </li>
        );
      });
    } else {
      loading = (
        <div className='loading-container'>
          <span>Loading...</span>
        </div>
      );
    }
    
    
    return (
      <div className='post-list-container'>
        <ul>
          { posts }
          { loading }
        </ul>
      </div>
    );
  }
});

module.exports = PostList;