'use strict';

var Dispatcher        = require('../dispatcher'),
    SettingsConstants = require('../constants/settings'),
    SettingsActions;

SettingsActions = {
  updateSettings: function (payload) {
    Dispatcher.dispatch({
      type:     SettingsConstants.ActionTypes.UPDATE_SETTINGS,
      settings: payload.settings,
      subreddit: payload.subreddit
    });
  }
};

module.exports = SettingsActions;