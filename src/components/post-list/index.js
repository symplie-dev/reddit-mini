var React         = require('react'),
    Post          = require('./post'),
    PostsStore    = require('../../stores/posts'),
    SettingsStore = require('../../stores/settings'),
    PostList;

PostList = React.createClass({
  getInitialState: function () {
    return {
      posts: PostsStore.getPosts()
    }
  },
  
  componentDidMount: function () {
    PostsStore.init();
    PostsStore.addChangeListener(this._handlePostsChange);
    SettingsStore.addChangeListener(this._handlePostsChange);
  },

  componentWillUnmount: function () {
    PostsStore.removeChangeListener(this._handlePostsChange);
    SettingsStore.addChangeListener(this._handlePostsChange);
  },
  
  render: function () {
    var posts = [],
        showImages = SettingsStore.getSettings().showImages;
    
    this.state.posts.forEach(function (item, index) {
      posts.push(<li key={ index }><Post content={ item.data } index={ index } showImages={ showImages } /></li>);
    });
    
    return (
      <div className='post-list-container'>
        <ul>
          { posts }
        </ul>
      </div>
    );
  },
  
  /* Private Functions
  ---------------------------------------------------------------------------*/
  _handlePostsChange: function () {
    this.setState({
      posts: PostsStore.getPosts()
    });
  }
});

module.exports = PostList;