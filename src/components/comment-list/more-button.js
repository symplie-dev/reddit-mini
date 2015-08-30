var React = require('react'),
    MoreButton;

MoreButton = React.createClass({
	propTypes: {
    numMore: React.PropTypes.number.isRequired,
    url:     React.PropTypes.string.isRequired
  },
    
	render: function () {
    return (
      <a className='more-comments-btn' href={ this.props.url }>{ this.props.numMore }&nbsp;more</a>
    );
  }
});

module.exports = MoreButton;