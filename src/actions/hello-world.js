/**
 * Every React 'View-Controller' component should have its own actions file.
 * The actions file should define the public API for a component, i.e. what
 * operations are available to interact with said component. 
 */
'use strict';

var Dispatcher          = require('../dispatcher'),
    HelloWorldConstants = require('../constants/hello-world'),
    HelloWorldActions;

HelloWorldActions = {
  
  /**
   * Define actions here. They can take parameters and pass the payload on to
   * the stores that are listening. Actions *must* have types, typically
   * defined in our constants file. Actions are basically wrappers to calls to
   * `Dispatcher.dispatch()`
   * 
   * @param {string} name The name to update to
   */
  updateName: function (name) {
    Dispatcher.dispatch({
      type: HelloWorldConstants.ActionTypes.UPDATE_NAME,
      name: name
    });
  }
};

module.exports = HelloWorldActions;