var React          = require('react'),
    SubredditInput = require('./subreddit-input'),
    SettingsModal  = require('../modal/settings'),
    PostsStore     = require('../../stores/posts'),
    PostsActions   = require('../../actions/posts'),
    Heading;

Heading = React.createClass({
  getInitialState: function () {
    return {
      subreddit: 'all'
    }
  },
  
  componentDidMount: function () {
    PostsStore.addChangeListener(this._handlePostsChange);
  },
  
  componentWillUnmount: function () {
    PostsStore.removeChangeListener(this._handlePostsChange);
  },
  
  render: function () {
    return (
      <header>
        <span className='heading-btn heading-btn-left'>
          <span className='octicon octicon-gear' onClick={ this._showSettingsModal }></span>
        </span>
        <SubredditInput subreddit={ this.state.subreddit } />
        <span className='heading-btn heading-btn-right'>
          <span className='octicon octicon-sync' onClick={ this._handleRefreshPosts }></span>
        </span>
      </header>
    );
  },
  
  /* Private Functions
   --------------------------------------------------------------------------*/
   _handlePostsChange: function () {
     this.setState({
       subreddit: PostsStore.getSubreddit()
     });
   },
   
   _showSettingsModal: function () {
     React.render(<SettingsModal />, document.getElementById('settingsModalContainer'));
   },
  
  _handleRefreshPosts: function () {
    PostsActions.refreshPosts();
  }
});

module.exports = Heading;