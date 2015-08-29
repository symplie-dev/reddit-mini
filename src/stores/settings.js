'use strict';

var assign            = require('object-assign'),
    EventEmitter      = require('events').EventEmitter,
    $                 = require('jquery'),
    Q                 = require('q'),
    Dispatcher        = require('../dispatcher'),
    SettingsConstants = require('../constants/settings'),
    SettingsActions   = require('../actions/settings'),
    RedditActions     = require('../actions/reddit'),
    Dao               = require('../dao'),
    _storeData        = {},
    SettingsStore;

_storeData = {
  settings: SettingsConstants.DEFAULT_SETTINGS
};

SettingsStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getSettings: function () {
    return _storeData.settings;
  },
  
  init: function () {
    var self     = this,
        deferred = Q.defer();
    
    Dao.getSettings().then(function (settings) {
      if (!settings) {
        Dao.setSettings(_storeData.settings).then(function () {
          deferred.resolve(settings);
        });
      } else {
        _storeData.settings = settings;
        self.emitChange();
        deferred.resolve(settings);
      }
    }).catch(function (err) {
      deferred.reject(err);
    });
    
    return deferred.promise;
  }
});


/* Register callback with Dispatcher
-----------------------------------------------------------------------------*/

SettingsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case SettingsConstants.ActionTypes.UPDATE_SETTINGS:
      _updateSettings(action.settings, action.subreddit).then(function () {
        SettingsStore.emitChange();
        PostsActions.refreshPosts();
      });
      break;
    default:
      // no-op
      break;
  }
});

/* Private Functions
-----------------------------------------------------------------------------*/

function _updateSettings(settings, subreddit) {
  var deferred = Q.defer(),
      self     = this;
  
  if (settings && settings.savePreviousSub && subreddit) {
    settings.previousSub = subreddit;
  } else {
    settings.previousSub = null;
  }

  Dao.setSettings(settings).then(function () {
    _storeData.settings = settings;
    deferred.resolve();
  }).catch(function () {
    deferred.reject();
  });
  
  return deferred.promise;
}

function _setSubreddit(subreddit) {
  _storeData.subreddit = subreddit;
}

/* Export Module
-----------------------------------------------------------------------------*/
module.exports = SettingsStore;