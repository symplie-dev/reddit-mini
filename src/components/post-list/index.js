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
    setTimeout(function () {
      document.getElementsByTagName("html")[0].style.minWidth='401px';
      setTimeout(function () {
        document.getElementsByTagName("html")[0].style.minWidth='400px';
      }, 1)
    },1);
  },

  componentWillUnmount: function () {
    PostsStore.removeChangeListener(this._handlePostsChange);
    SettingsStore.addChangeListener(this._handlePostsChange);
  },

  componentDidUpdate: function (prevProps, prevState) {
    console.log('rendered')
    setTimeout(function () {
      document.getElementsByTagName("html")[0].style.minWidth='401px';
      setTimeout(function () {
        document.getElementsByTagName("html")[0].style.minWidth='400px';
      }, 1)
    },1);
  },
  
  render: function () {
    var posts = [],
        showImages = SettingsStore.getSettings().showImages,
        autoExpandNsfw = SettingsStore.getSettings().autoExpandNsfw;
    
    this.state.posts.forEach(function (item, index) {
      posts.push(
        <li key={ index }>
          <Post content={ item.data } index={ index } showImages={ showImages } autoExpandNsfw={ autoExpandNsfw } />
        </li>
      );
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