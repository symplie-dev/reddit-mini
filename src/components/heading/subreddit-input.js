var React        = require('react'),
    PostsActions = require('../../actions/posts'),
    SubredditInput;

SubredditInput = React.createClass({
  getDefaultProps: function () {
    return {
      subreddit: 'all'
    }
  },
  
  render: function () {
    return (
      <div className='subreddit-input'>
        <span className='subreddit-lbl'>/r/</span>
        <div className='subreddit-input-inner'>
          <input type='text' placeholder='subreddit'
            defaultValue={ this.props.subreddit } onKeyUp={ this._handleSubredditChange } />
        </div>
        <span className='subreddit-input-btn'>
          <span className='octicon octicon-chevron-right' onClick={ this._handleRefreshPosts }></span>
        </span>
      </div>
    );
  },
  
  /* Private functions
   --------------------------------------------------------------------------*/
  _handleSubredditChange: function (evt) {
    PostsActions.setSubreddit(evt.target.value);
  },
  
  _handleRefreshPosts: function () {
    PostsActions.refreshPosts();
  }
});

module.exports = SubredditInput;