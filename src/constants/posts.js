'use strict';

var PostsConstants = {
  ActionTypes: {
    REFRESH_POSTS:    'REFRESH_POSTS',
    SET_SUBREDDIT:    'SET_SUBREDDIT',
    REFRESH_COMMENTS: 'REFRESH_COMMENTS'
  },
  REDDIT_POST_API_PREFIX:  'https://www.reddit.com/r/',
  REDDIT_POST_API_POSTFIX: '/hot.json?limit=',
  REDDIT_DOMAIN:           'https://www.reddit.com',
  REDDIT_COMMENTS_LIMIT:   250,
  REDDIT_COMMENTS_DEPTH:   10
}

module.exports = PostsConstants;