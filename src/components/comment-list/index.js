var React           = require('react'),
    MoreButton      = require('./more-button'),
    CommentsContext = require('./comments-context'),
    Util            = require('../../util'),
    Comment,
    CommentList;

Comment = React.createClass({
  propTypes: {
      comment:   React.PropTypes.object.isRequired,
      permalink: React.PropTypes.string.isRequired,
      post:      React.PropTypes.object
  },
    
  render: function () {
    var self = this,
        children;
    
    if (this.props.comment.data && this.props.comment.data.replies &&
        this.props.comment.data.replies.data && this.props.comment.data.replies.data.children) {
      children = (<CommentList comments={ this.props.comment.data.replies.data.children } permalink={ this.props.permalink } parentId={ this.props.comment.data.id } />);
    }
    
    return (
      <div className='comment-container'>
        <div className='comment-meta'>
            <div className='comment-author'>{ this.props.comment.data.author }</div>
            <div className='comment-readable-time'>
              <a href={'https://www.reddit.com' + this.props.permalink + this.props.comment.data.id}> { Util.getReadableTimePassed(this.props.comment.data.created_utc) }</a>
            </div>
        </div>
        <div className='comment-body markdown-body' dangerouslySetInnerHTML={ Util.convertMarkdown(this.props.comment.data.body) } />
          <ul>
            { children }
          </ul>
        </div>
      );
    }
});

CommentList = React.createClass({
  propTypes: {
    comments:  React.PropTypes.array,
    post:      React.PropTypes.object,
    permalink: React.PropTypes.string,
    parentId:  React.PropTypes.string
  },
  
  getDefaultProps: function () {
    return {
      comments:  []
    };
  },
  
  render: function () {
    var self     = this,
        comments = [],
        commentsContext,
        loading;
    
    if (this.props.comments.length < 1) {
      loading = (
        <div className='loading-container'>
          <span>Loading...</span>
        </div>
      );
    } else {
      if (this.props.post) {
        commentsContext = (
          <CommentsContext post={ this.props.post } />
        );
      }
      
      this.props.comments.forEach(function (comment, index) {
        var parentId = self.props.parentId || comment.data.parentId;
        
        if (comment.kind.toLowerCase() === 't1') {
          comments.push(<li key={ index }><Comment comment={ comment } permalink={ self.props.permalink } /></li>);
        } else if (comment.kind.toLowerCase() === 'more' && comment.data.count > 0) {
          comments.push(<li key={ index }><MoreButton numMore={ comment.data.count } url={ 'https://reddit.com' + self.props.permalink + parentId } /></li>);
        }
      });
    }
    
    
    return (
      <div>
        { loading }
        { commentsContext }
        <ul>
          { comments }
        </ul>
      </div>
    );
  }
});

module.exports = CommentList;