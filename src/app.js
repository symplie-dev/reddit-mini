/**
 * app.js is the entry point used by our Gulp file to compile our React
 * project into a single cohesive JavaScript-compliant file. We will
 * add top-level React components to the DOM here.
 */

var React    = require('react'),
    Heading  = require('./components/heading'),
    PostList = require('./components/post-list');

React.render(<Heading />, document.getElementById('headingContainer'));
React.render(<PostList />, document.getElementById('postListContainer'));