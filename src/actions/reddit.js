'use strict';

var Dispatcher     = require('../dispatcher'),
    RedditConstants = require('../constants/reddit'),
    RedditActions;

RedditActions = {
  refreshPosts: function () {
    Dispatcher.dispatch({
      type: RedditConstants.ActionTypes.REFRESH_POSTS
    });
  },
  
  setSubreddit: function (subreddit) {
    Dispatcher.dispatch({
      type:      RedditConstants.ActionTypes.SET_SUBREDDIT,
      subreddit: subreddit
    })
  },
  
  refreshComments: function (payload) {
    Dispatcher.dispatch({
      type:      RedditConstants.ActionTypes.REFRESH_COMMENTS,
      permalink: payload.permalink,
      parent:    payload.parent
    });
  }
};

module.exports = RedditActions;