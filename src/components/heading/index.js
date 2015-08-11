var React          = require('react'),
    SubredditInput = require('./subreddit-input'),
    SettingsModal  = require('../modal/settings'),
    PostsStore     = require('../../stores/posts'),
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
        <span className='heading-btn'>
          <span className='octicon octicon-gear' onClick={this._showSettingsModal}></span>
        </span>
        <SubredditInput subreddit={this.state.subreddit} />
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
   }
});

module.exports = Heading;