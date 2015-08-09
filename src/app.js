/**
 * app.js is the entry point used by our Gulp file to compile our React
 * project into a single cohesive JavaScript-compliant file. We will
 * add top-level React components to the DOM here.
 */

var React      = require('react'),
    HelloWorld = require('./components/hello-world');

React.render(<HelloWorld />, document.getElementById('helloWorldContainer'));