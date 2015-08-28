var React                 = require('react'),
    Util                  = require('../../util'),
    SlideContainerActions = require('../../actions/slide-container'),
    CommentsContext;

CommentsContext = React.createClass({
	propTypes: {
    post: React.PropTypes.object
  },
    
	render: function () {
    console.log(this.props.post);
  
    return (
      <div className='comments-context'>
        <div className='comments-context-title'>{ this.props.post.title }</div>
        <a className='comments-context-url' href={ this.props.post.url }>
            { this.props.post.domain }
        </a>
        <div className='comments-context-meta'>
          <div className='meta-row'>
            <span>{ this.props.post.score }&nbsp;points</span>&nbsp;
            <span>by { this.props.post.author }</span>&nbsp;
            <span>{ Util.getReadableTimePassed(this.props.post.created_utc) }&nbsp;ago</span>&nbsp;·&nbsp;<span>{ this.props.post.num_comments }&nbsp;comments</span>
          </div>
          <a className='comments-context-url comments-url' href={ 'https://reddit.com' + this.props.post.permalink }>
              { Util.getShortPrettyStr(this.props.post.permalink, 45) }
          </a>
        </div>
        <div className='back-to-posts-btn' onClick={ this._handleBackToPostsClick }><span className='octicon octicon-chevron-left'></span>back to posts</div>
      </div>
    );
  },
  
  _handleBackToPostsClick: function () {
    SlideContainerActions.slideToPosts();
  }
});

module.exports = CommentsContext