/**
 * There isn't a lot to see in this file. It uses Facebook's
 * Dispatcher implementation from NPM. The dispatcher is where
 * we register callbacks for various stores. The callbacks can
 * be triggered by Actions. The callbacks typically update
 * state in React components.
 */

'use strict';

var Dispatcher = require('flux').Dispatcher; 

module.exports = new Dispatcher(); 