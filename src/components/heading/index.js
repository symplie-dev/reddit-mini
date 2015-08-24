var React          = require('react'),
    $              = require('jquery'),
    SubredditInput = require('./subreddit-input'),
    SettingsModal  = require('../modal/settings'),
    PostsStore     = require('../../stores/posts'),
    PostsActions   = require('../../actions/posts'),
    Heading;

Heading = React.createClass({
  propTypes: {
    subreddit:       React.PropTypes.string.isRequired,
    savePreviousSub: React.PropTypes.bool.isRequired
  },
  
  render: function () {
    return (
      <header>
        <span className='heading-btn heading-btn-left'>
          <span className='octicon octicon-gear' onClick={ this._showSettingsModal }></span>
        </span>
        <SubredditInput initialSub={ this.props.subreddit } savePreviousSub={ this.props.savePreviousSub } />
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
    PostsActions.setSubreddit($('.subreddit-input-inner input').val());
  }
});

module.exports = Heading;