'use strict';

var Dispatcher              = require('../dispatcher'),
    SlideContainerConstants = require('../constants/slide-container'),
    SlideContainerActions;

SlideContainerActions = {
  slideToPosts: function () {
    Dispatcher.dispatch({
      type: SlideContainerConstants.ActionTypes.SLIDE_TO_POSTS
    });
  },
  
  slideToComments: function () {
    Dispatcher.dispatch({
      type: SlideContainerConstants.ActionTypes.SLIDE_TO_COMMENTS
    })
  }
};

module.exports = SlideContainerActions;