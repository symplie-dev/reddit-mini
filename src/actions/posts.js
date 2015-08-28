'use strict';

var Dispatcher     = require('../dispatcher'),
    PostsConstants = require('../constants/posts'),
    PostsActions;

PostsActions = {
  refreshPosts: function () {
    Dispatcher.dispatch({
      type: PostsConstants.ActionTypes.REFRESH_POSTS
    });
  },
  
  setSubreddit: function (subreddit) {
    Dispatcher.dispatch({
      type:      PostsConstants.ActionTypes.SET_SUBREDDIT,
      subreddit: subreddit
    })
  },
  
  refreshComments: function (payload) {
    Dispatcher.dispatch({
      type:      PostsConstants.ActionTypes.REFRESH_COMMENTS,
      permalink: payload.permalink,
      parent:    payload.parent
    });
  }
};

module.exports = PostsActions;