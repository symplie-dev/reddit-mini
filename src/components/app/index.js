var React             = require('react'),
    Heading           = require('../heading'),
    PostList          = require('../post-list'),
    SettingsModal     = require('../modal/settings'),
    PostsActions      = require('../../actions/posts'),
    PostsStore        = require('../../stores/posts'),
    SettingsConstants = require('../../constants/settings'),
    SettingsStore     = require('../../stores/settings'),
    App;

App = React.createClass({
  getInitialState: function () {
    return {
      posts:      PostsStore.getPosts(),
      postsError: PostsStore.getPostsError(),
      settings:   SettingsConstants.DEFAULT_SETTINGS
    }
  },
  
  componentDidMount: function () {
    PostsStore.addChangeListener(this._handlePostsChange);
    SettingsStore.addChangeListener(this._handleSettingsChange);
    // Initialize Stores
    SettingsStore.init().then(function (settings) {
      if (settings.savePreviousSub && settings.previousSub) {
        PostsActions.setSubreddit(settings.previousSub);
      } else {
        PostsActions.setSubreddit('all');
      }
    }).catch(function (err) {
      console.log(err);
    });
  },
  
  componentWillUnmount: function () {
    PostsStore.removeChangeListener(this._handlePostsChange);
    SettingsStore.removeChangeListener(this._handleSettingsChange);
  },
  
  render: function () {
    var sub = 'all';
    
    if (this.state.settings.previousSub) {
      sub = this.state.settings.previousSub;
    }
    
    return (
      <div className='app-content'>
        <Heading subreddit={ sub } savePreviousSub={ this.state.settings.savePreviousSub } />
        <PostList postsError={ this.state.postsError } posts={ this.state.posts } showImages={ this.state.settings.showImages } showNsfwImages={ this.state.settings.showNsfwImages } />
        <div id='settingsModalContainer'></div>
      </div>
    );
  },
  
  /* Private Functions
  ---------------------------------------------------------------------------*/
  _handlePostsChange: function () {
    this.setState({
      posts:      PostsStore.getPosts(),
      postsError: PostsStore.getPostsError()
    });
  },
  
  _handleSettingsChange: function () {
    this.setState({
      settings: SettingsStore.getSettings()
    });
  }
});

module.exports = App;