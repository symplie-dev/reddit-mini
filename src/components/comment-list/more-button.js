var React = require('react'),
    MoreButton

MoreButton = React.createClass({
	propTypes: {
    numMore: React.PropTypes.number.isRequired
  },
    
	render: function () {
    return (
      <button className='more-btn'>{ this.props.numMore } more</button>
    );
  }
});

module.exports = MoreButton;