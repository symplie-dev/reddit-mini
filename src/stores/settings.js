'use strict';

var assign            = require('object-assign'),
    EventEmitter      = require('events').EventEmitter,
    $                 = require('jquery'),
    Q                 = require('q'),
    Dispatcher        = require('../dispatcher'),
    SettingsConstants = require('../constants/settings'),
    SettingsActions   = require('../actions/settings'),
    PostsActions      = require('../actions/posts'),
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
          deferred.resolve();
        });
      } else {
        _storeData.settings = settings;
        self.emitChange();
        deferred.resolve();
      }
    }).catch(function () {
      deferred.reject();
    });
    
    return deferred.promise;
  }
});

SettingsStore.init().then(function () {
  PostsActions.refreshPosts();
});

/* Register callback with Dispatcher
-----------------------------------------------------------------------------*/

SettingsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case SettingsConstants.ActionTypes.UPDATE_SETTINGS:
      _updateSettings(action.settings).then(function () {
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

function _updateSettings(settings) {
  var deferred = Q.defer(),
      self     = this;

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

module.exports = SettingsStore;