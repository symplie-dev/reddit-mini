var React       = require('react'),
    CommentList = require('./index'),
    Comment;

Comment = React.createClass({
  propTypes: {
      comment:   React.PropTypes.object.isRequired,
      permalink: React.PropTypes.string.isRequired
  },
    
  render: function () {
    var self = this,
        children = (<CommentList comments={ this.props.comment.data.replies.data.children } permalink={ this.props.permalink } />);
      
    return (
      <div className='comment-container'>
        <div className='comment-meta'>
            <div className='comment-author'>{ this.props.comment.data.author }</div>
            <div className='comment-readable-time'>
              <a href={this.props.permalink + this.props.comment.data.id}>3 hours ago</a>
            </div>
        </div>
        <div className='comment-body'>
          { this.props.comment.data.body }
        </div>
          
        </div>
      );
    }
});

module.exports = Comment;

// <ul>
//             { children }
//           </ul>