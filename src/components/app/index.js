var React               = require('react'),
    Heading             = require('../heading'),
    SlideContainer      = require('../slide-container'),
    SettingsModal       = require('../modal/settings'),
    RedditActions       = require('../../actions/reddit'),
    RedditStore         = require('../../stores/reddit'),
    SettingsConstants   = require('../../constants/settings'),
    SettingsStore       = require('../../stores/settings'),
    SlideContainerStore = require('../../stores/slide-container'),
    App;

App = React.createClass({
  getInitialState: function () {
    return {
      posts:       RedditStore.getPosts(),
      postsError:  RedditStore.getPostsError(),
      settings:    SettingsConstants.DEFAULT_SETTINGS,
      slideOffset: SlideContainerStore.getSlideOffset(),
      comments:    RedditStore.getComments(),
      post:        RedditStore.getPost()
    }
  },
  
  componentDidMount: function () {
    RedditStore.addChangeListener(this._handlePostsChange);
    SettingsStore.addChangeListener(this._handleSettingsChange);
    SlideContainerStore.addChangeListener(this._handleSlideContainerChange);
    // Initialize Stores
    SettingsStore.init().then(function (settings) {
      if (settings && settings.savePreviousSub && settings.previousSub) {
        RedditActions.setSubreddit(settings.previousSub);
      } else {
        RedditActions.setSubreddit('all');
      }
    }).catch(function (err) {
      console.log(err);
    });
  },
  
  componentWillUnmount: function () {
    RedditStore.removeChangeListener(this._handlePostsChange);
    SettingsStore.removeChangeListener(this._handleSettingsChange);
    SlideContainerStore.removeChangeListener(this._handleSlideContainerChange);
  },
  
  render: function () {
    var sub = 'all';
    
    if (this.state.settings.previousSub) {
      sub = this.state.settings.previousSub;
    }
    
    return (
      <div className='app-content'>
        <Heading subreddit={ sub } savePreviousSub={ this.state.settings.savePreviousSub } />
        <SlideContainer slideOffset={ this.state.slideOffset } postsError={ this.state.postsError }
          posts={ this.state.posts } comments={ this.state.comments } post={ this.state.post } showImages={ this.state.settings.showImages }
          showNsfwImages={ this.state.settings.showNsfwImages } />
        <div id='settingsModalContainer'></div>
      </div>
    );
  },
  
  /* Private Functions
  ---------------------------------------------------------------------------*/
  _handlePostsChange: function () {
    this.setState({
      posts:      RedditStore.getPosts(),
      postsError: RedditStore.getPostsError(),
      comments:   RedditStore.getComments(),
      post:       RedditStore.getPost()
    });
  },
  
  _handleSettingsChange: function () {
    this.setState({
      settings: SettingsStore.getSettings()
    });
  },
  
  _handleSlideContainerChange: function () {
    this.setState({
      slideOffset: SlideContainerStore.getSlideOffset()
    });
  }
});

module.exports = App;