'use strict';

var assign                   = require('object-assign'),
    EventEmitter             = require('events').EventEmitter,
    $                        = require('jquery'),
    Dispatcher               = require('../dispatcher'),
    SlildeContainerConstants = require('../constants/slide-container'),
    _storeData               = {},
    SlideContainerStore;

_storeData = {
  slideOffset: 0,
};

SlideContainerStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },
  
  getSlideOffset: function () {
    return _storeData.slideOffset;
  }
});

/* Register callback with Dispatcher
-----------------------------------------------------------------------------*/

SlideContainerStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case SlildeContainerConstants.ActionTypes.SLIDE_TO_POSTS:
      _storeData.slideOffset = 0;
      SlideContainerStore.emitChange();
      break;
    case SlildeContainerConstants.ActionTypes.SLIDE_TO_COMMENTS:
      _storeData.slideOffset = -380;
      SlideContainerStore.emitChange();
      break;
    default:
      // no-op
      break;
  }
});

/* Private Functions
-----------------------------------------------------------------------------*/


module.exports = SlideContainerStore;