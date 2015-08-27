var React      = require('react'),
    // Comment    = require('./comment'),
    MoreButton = require('./more-button'),
    Comment,
    CommentList;

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
          <ul>
            { children }
          </ul>
        </div>
      );
    }
});

CommentList = React.createClass({
  propTypes: {
    comments: React.PropTypes.array
  },
  
  getDefaultProps: function () {
    return {
      comments:  [],
      permalink: 'http://www.reddit.com/r/Showerthoughts/comments/3ihab6/the_best_item_to_protect_you_from_sasquatch/'
    };
  },
  
  render: function () {
    var self = this,
        comments = [];
      
    this.props.comments.forEach(function (comment, index) {
      if (comment.kind.toLowerCase() === 't1') {
        comments.push(<li key={ index }><Comment comment={ comment } permalink={ self.props.permalink } /></li>);
      } else if (comment.kind.toLowerCase() === 'more' && comment.data.count > 0) {
      //   comments.push(<li key={ index }><MoreButton numMore={ comment.data.count } /></li>);
      }
    });
    
    return (
      <ul>
        { comments }
      </ul>
    );
  }
});

module.exports = CommentList;