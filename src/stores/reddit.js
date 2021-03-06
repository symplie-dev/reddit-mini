'use strict';

var assign          = require('object-assign'),
    EventEmitter    = require('events').EventEmitter,
    $               = require('jquery'),
    Q               = require('q'),
    Path            = require('path'),
    Dispatcher      = require('../dispatcher'),
    RedditConstants = require('../constants/reddit'),
    RedditActions   = require('../actions/reddit'),
    SettingsStore   = require('./settings'),
    SettingsActions = require('../actions/settings'),
    _storeData      = {},
    RedditStore;

_storeData = {
  subreddit:  'all', // The currently selected sub
  posts:      [],    // Posts for a given sub
  postsError: false, // True if there is an error fetching the posts for a sub
  comments:   [],    // Comments for a given post
  post:       {}     // The post in context for the comments
};

RedditStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },
  
  getSubreddit: function () {
    return _storeData.subreddit;
  },

  getPosts: function () {
    return _storeData.posts;
  },
  
  getPostsError: function () {
    return _storeData.postsError;
  },
  
  getComments: function () {
    return _storeData.comments;
  },
  
  getPost: function () {
    return _storeData.post;
  },
  
  init: function () {
    var self     = this,
        deferred = Q.defer();
    
    _refreshPostsFromSubreddit().then(function () {
      self.emitChange();
      deferred.resolve();
    });
    
    return deferred.promise;
  }
});

/* Register callback with Dispatcher
-----------------------------------------------------------------------------*/

RedditStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case RedditConstants.ActionTypes.REFRESH_POSTS:
      _refreshPostsFromSubreddit().then(function () {
        _storeData.postsError = false;
        RedditStore.emitChange();
      }).catch(function(err) {
        _storeData.postsError = true;
        RedditStore.emitChange();
      });
      break;
      
    case RedditConstants.ActionTypes.SET_SUBREDDIT:
      _setSubreddit(action.subreddit);
      _refreshPostsFromSubreddit().then(function () {
         _storeData.postsError = false;
        RedditStore.emitChange();
      }).catch(function(err) {
        _storeData.postsError = true;
        RedditStore.emitChange();
      });
      break;
      
    case RedditConstants.ActionTypes.REFRESH_COMMENTS:
      _refreshComments(action.permalink, action.parent).then(function () {
        RedditStore.emitChange();
      }).catch(function (err) {
        console.log(err);
      });
      break;
      
    default:
      // no-op
      break;
  }
});

/* Private Functions
-----------------------------------------------------------------------------*/

function _refreshPostsFromSubreddit() {  
  var url      = [RedditConstants.REDDIT_POST_API_PREFIX
                 ,_storeData.subreddit
                 ,RedditConstants.REDDIT_POST_API_POSTFIX
                 ,SettingsStore.getSettings().numPosts].join(''),
      deferred = Q.defer();
  
  _storeData.posts = [];
  RedditStore.emitChange();
      
  $.get(url).done(function (res) {
    if (res.data && res.data.children && res.data.children.length > 0) {
      
      // Remove the promoted posts found on some popular subreddits
      if (res.data.children.length > SettingsStore.getSettings().numPosts) {
        res.data.children.splice(0, 1);
      }
      
      _storeData.posts = res.data.children;
      
      deferred.resolve();
    } else {
      deferred.reject();
    }
  }).fail(function (err) {
    deferred.reject(err);
  });
  
  return deferred.promise;
}

/**
 * Get an array of comments and their children.
 * 
 * @param {string} permalink The link to reddit comments
 * @param {string} [parent]  The parent comment
 */
function _refreshComments(permalink, parent) {
  var url      = [RedditConstants.REDDIT_DOMAIN
                 ,permalink].join(''),
      deferred = Q.defer();
  
  if (parent) {
    url = Path.join(url, parent);
  }
  
  url += ['.json?limit='
         ,RedditConstants.REDDIT_COMMENTS_LIMIT
         ,'&depth='
         ,RedditConstants.REDDIT_COMMENTS_DEPTH].join('');
  
  _storeData.comments = [];
  RedditStore.emitChange();
  
  $.get(url).done(function (res) {
    if (res && res.length && res[1] && res[1].data && res[1].data.children) {
      _storeData.comments = res[1].data.children;
      _storeData.post = res[0].data.children[0].data;
      deferred.resolve();
    } else {
      deferred.reject();
    }
  }).fail(function (err) {
    deferred.reject(err);
  });
  
  return deferred.promise;
}

function _setSubreddit(subreddit) {
  _storeData.subreddit = subreddit;
}

module.exports = RedditStore;