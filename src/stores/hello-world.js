/**
 * A store is used to some application-level state. No other part of the app
 * has insight into how a store structures or manages its data. Stores register
 * callbacks with the dispatcher and react based on the specific action types
 * called. All stores receive all actions from the dispatcher but typically
 * only react to a certain set of action types.
 * 
 * Stores emit change events and registered components can then react to the
 * changes (typically updating the DOM or by firing off other actions).
 */
'use strict';

var assign              = require('object-assign'),
    EventEmitter        = require('events').EventEmitter,
    Dispatcher          = require('../dispatcher'),
    HelloWorldConstants = require('../constants/hello-world'),
    HelloWorldActions   = require('../actions/hello-world'),
    _name               = 'Name',
    HelloWorldStore;

HelloWorldStore = assign({}, EventEmitter.prototype, {
  /**
   * Our React components that are dependent on the internal state of the store
   * listen for the 'change' event. That means that we need to emit this change
   * event whenever some internal data change has occurred.
   */
  emitChange: function () {
    this.emit('change');
  },

  /**
   * Our React components use this function to register callbacks for React
   * components that are interested in the store's state.
   */
  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  /**
   * When React components are destroyed we need a mechanism for removing
   * the registered callback to prevent memory leaks.
   */
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  /**
   * Stores do not expose setter methods. The only way to interact with a store
   * is via the actions. We can however view the state (read-only) at any time.
   * This is typically used by React components that are observing store as
   * part of their underlying state.
   */
  getName: function () {
    return _name;
  },
  
  /**
   * You may want to expose some initialize function for some stores. For
   * example, you may need to fetch some data from the server through a REST
   * API. This method is optional.
   */
  init: function () {
    // Here we're creating an interval to change the name every two seconds.
    // This simulates an action being fired as the result of a user interaction
    // or due to another component, etc.
    setInterval(function () {
      var name = HelloWorldStore.getName();
      
      if (name.toLowerCase() === 'world') {
        name = 'Guys';
      } else {
        name = 'World';
      }
      
      console.log('Changing the name!');
      HelloWorldActions.updateName(name);
    }, 2000)
  }
});

/**
 * Register the callback with the dispatcher. This callback will be executed
 * every time *any* action is executed. Use a switch statement to only react
 * when the action type is relevant to the store.
 * 
 * The dispatchToken can be used to yield to other stores if you want certain
 * stores to fully update before reacting to actions. This can ensure that
 * you don't create circular dependencies between your stores.
 */
HelloWorldStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case HelloWorldConstants.ActionTypes.UPDATE_NAME:
      // use private setters to update store data. Depending on how the
      // action is defined you may be able to access a payload, i.e.
      // action.name in this case.
      _setName(action.name);
      // If you update the internal state of the store you must let
      // observing components know by calling `emitChange()`
      HelloWorldStore.emitChange();
      break;
    default:
      // no-op
      break;
  }
});

/*---- PRIVATE METHODS ----*/

function _setName(name) {
  _name = name;
}

module.exports = HelloWorldStore;