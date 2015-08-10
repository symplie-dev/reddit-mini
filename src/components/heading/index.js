var React          = require('react'),
    SubredditInput = require('./subreddit-input'),
    Heading;

Heading = React.createClass({
  
  render: function () {
    return (
      <header>
        <SubredditInput subreddit='all' />
      </header>
    );
  }
});

module.exports = Heading;