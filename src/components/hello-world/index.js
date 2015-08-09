/**
 * A sample react component. This component is considered a 'Controller-View'
 * as opposed to a plain 'View' in React due to the fact that it's listening to
 * changes in a Store object. If you think of your react components as a
 * hierarchy we typically try to keep 'Controller-View' components at the top
 * of the hierarchy. This keeps lower level components free of complexity and
 * mutability.
 */

var React           = require('react'),
    cx              = require('classnames'),
    HelloWorldStore = require('../../stores/hello-world'),
    HelloWorld;

HelloWorld = React.createClass({
  /**
   * PropTypes defines the props expected to be passed to the component. It is
   * a simple object literal, as opposed to a function.
   */
  propTypes: {
    greeting: React.PropTypes.string
  },
   
  /**
   * Props are accessed using `this.props.propName`. Props are immutable and
   * must be passed in from the parent component as attributes OR defined in
   * the `getDefaultProps` function. Props passed in from the parent will 
   * override props defined here.
   * 
   * @return {Object} The props object with various properties
   */
  getDefaultProps: function () {
    return {
      greeting: 'Hello'
    }
  },
  
  /**
   * State is mutable. You *must* set the initial state for all state members
   * in the `getInitialState` function or the component would have an undefined
   * state. Initial state should *never* be defined using a prop *unless* the
   * prop is passed in explicitly for initialization (and the naming should
   * reflect this, i.e. `this.props.initialGreeting`).
   * 
   * @return {Object} The state object with various properties
   */
  getInitialState: function () {
    return {
      name: 'World'
    }
  },
  
  /**
   * `componentDidMount` is invoked once after the component is initially
   * rendered. It's a good place to attach event listeners for top-level react
   * components that need to listen for changes in stores.
   */
  componentDidMount: function () {
    HelloWorldStore.init();  // Optional, not every store needs to be intialized
    HelloWorldStore.addChangeListener(this._handleNameChange);
  },

  /**
   * `componentWillUnmount` is invoked once before the component is destroyed.
   * It's a good place to remove event listeners to prevent memory leaks and
   * for any necessary DOM cleanup.
   */
  componentWillUnmount: function () {
    HelloWorldStore.removeChangeListener(this._handleNameChange);
  },
  
  /**
   * The render function contains the JSX used to define the component's
   * markdown. You can also include logic related to rendering in this
   * function. i.e. determining classes to apply based on state or props.
   * 
   * You can bind to variables including props and state using the syntax:
   * `{ this.props.name }`
   * 
   * Do not alter state in the render function or you create a render loop
   * (where changes to state trigger a render, in turn changing state in turn
   * rendering...).
   * 
   * @return {JSX} The JSX defining the components markdown
   */
  render: function () {
    // Sometimes we want to apply classes based on state, for that we use the
    // `classnames` NPM module defined as cx here. Define the class name on the
    // left and evaluate a boolean statement on the right. When true, the class
    // name will be added to the class name list.
    var helloWorldClasses = cx({
      'hello-world': true,
      'green':       this.state.name.toLowerCase() === 'world'
    });
    
    return (
      <div className={ helloWorldClasses }>{ this.props.greeting } { this.state.name }</div>
    );
  },
  
  /*---- PRIVATE METHODS ----*/
  
  /**
   * Calling `setState` will cause the `render` function to be invoked. Then
   * React does some majic behind the scenes to see if the change in state
   * requires the component to be actually be re-rendered in the DOM.
   */
  _handleNameChange: function () {
    this.setState({
      name: HelloWorldStore.getName()
    });
  }
});

module.exports = HelloWorld;