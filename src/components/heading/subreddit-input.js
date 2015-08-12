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
      </div>
    );
  },
  
  /* Private functions
   --------------------------------------------------------------------------*/
  _handleSubredditChange: function (evt) {
    if (evt.keyCode == 13) {
      PostsActions.refreshPosts();
    } else {
      PostsActions.setSubreddit(evt.target.value);
    }
  }
});

module.exports = SubredditInput;