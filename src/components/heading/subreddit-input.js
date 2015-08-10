var React = require('react'),
    SubredditInput;

SubredditInput = React.createClass({
  getDefaultProps: function () {
    return {
      subreddit: 'All'
    }
  },
  
  render: function () {
    return (
      <div className='subreddit-input'>
        <span className='subreddit-lbl'>/r/</span>
        <div className='subreddit-input-inner'>
          <input type='text' placeholder='subreddit' defaultValue={ this.props.subreddit } />
        </div>
      </div>
    );
  }
});

module.exports = SubredditInput;