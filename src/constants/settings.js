'use strict';

var SettingsConstants = {
  ActionTypes: {
    UPDATE_SETTINGS: 'UPDATE_SETTINGS'
  },
  DEFAULT_SETTINGS: {
    numPosts:        10,
    showImages:      true,
    showNsfwImages:  false,
    savePreviousSub: true,
    previousSub:     null
  }
}

module.exports = SettingsConstants;