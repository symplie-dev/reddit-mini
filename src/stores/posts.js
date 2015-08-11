'use strict';

var assign         = require('object-assign'),
    EventEmitter   = require('events').EventEmitter,
    $              = require('jquery'),
    Q              = require('q'),
    Dispatcher     = require('../dispatcher'),
    PostsConstants = require('../constants/posts'),
    PostsActions   = require('../actions/posts'),
    _storeData     = {},
    PostsStore;

_storeData = {
  subreddit: 'all',
  posts: []
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
      _refreshPostsFromSubreddit();
      PostsStore.emitChange();
      break;
    case PostsConstants.ActionTypes.SET_SUBREDDIT:
      _setSubreddit(action.subreddit);
      PostsStore.emitChange();
      break;
    default:
      // no-op
      break;
  }
});

/* Private Functions
-----------------------------------------------------------------------------*/

function _refreshPostsFromSubreddit() {
  var url = [PostsConstants.REDDIT_POST_API_PREFIX
            ,_storeData.subreddit
            ,PostsConstants.REDDIT_POST_API_POSTFIX].join(''),
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
  })
  
  return deferred.promise;
}

function _setSubreddit(subreddit) {
  _storeData.subreddit = subreddit;
}

module.exports = PostsStore;