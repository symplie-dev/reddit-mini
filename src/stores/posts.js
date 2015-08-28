'use strict';

var assign          = require('object-assign'),
    EventEmitter    = require('events').EventEmitter,
    $               = require('jquery'),
    Q               = require('q'),
    Path            = require('path'),
    Dispatcher      = require('../dispatcher'),
    PostsConstants  = require('../constants/posts'),
    PostsActions    = require('../actions/posts'),
    SettingsStore   = require('./settings'),
    SettingsActions = require('../actions/settings'),
    _storeData      = {},
    PostsStore;

_storeData = {
  subreddit: 'all',
  posts:     [],
  error:     false,
  comments:  [],
  post:      null // The post in context for the comments
};

PostsStore = assign({}, EventEmitter.prototype, {
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
    return _storeData.error;
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

PostsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case PostsConstants.ActionTypes.REFRESH_POSTS:
      _refreshPostsFromSubreddit().then(function () {
        _storeData.error = false;
        PostsStore.emitChange();
      }).catch(function() {
        console.log('error getting posts');
        _storeData.error = true;
        PostsStore.emitChange();
      });
      break;
    case PostsConstants.ActionTypes.SET_SUBREDDIT:
      _setSubreddit(action.subreddit);
      _refreshPostsFromSubreddit().then(function () {
         _storeData.error = false;
        PostsStore.emitChange();
      }).catch(function() {
        _storeData.error = true;
        PostsStore.emitChange();
      });
      break;
    case PostsConstants.ActionTypes.REFRESH_COMMENTS:
      _refreshComments(action.permalink, action.parent).then(function () {
        PostsStore.emitChange();
      }).catch(function (err) {
        console.log('error getting comments!')
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
  var url      = [PostsConstants.REDDIT_POST_API_PREFIX
                 ,_storeData.subreddit
                 ,PostsConstants.REDDIT_POST_API_POSTFIX
                 ,SettingsStore.getSettings().numPosts].join(''),
      deferred = Q.defer();
      
  $.get(url).done(function (res) {
    if (res.data && res.data.children && res.data.children.length > 0) {
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
  var url      = [PostsConstants.REDDIT_DOMAIN
                 ,permalink].join(''),
      deferred = Q.defer();
  
  if (parent) {
    url = Path.join(url, parent);
  }
  
  url += ['.json?limit='
         ,PostsConstants.REDDIT_COMMENTS_LIMIT
         ,'&depth='
         ,PostsConstants.REDDIT_COMMENTS_DEPTH].join('');
  
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

module.exports = PostsStore;