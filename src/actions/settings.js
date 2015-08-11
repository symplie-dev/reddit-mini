'use strict';

var Dispatcher        = require('../dispatcher'),
    SettingsConstants = require('../constants/settings'),
    SettingsActions;

SettingsActions = {
  updateSettings: function (settings) {
    Dispatcher.dispatch({
      type:     SettingsConstants.ActionTypes.UPDATE_SETTINGS,
      settings: settings
    });
  }
};

module.exports = SettingsActions;