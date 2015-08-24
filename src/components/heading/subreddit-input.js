var React           = require('react'),
    PostsActions    = require('../../actions/posts'),
    SettingsActions = require('../../actions/settings'),
    SettingsStore   = require('../../stores/settings'),
    SubredditInput;

SubredditInput = React.createClass({
  propTypes: {
    initialSub:      React.PropTypes.string.isRequired,
    savePreviousSub: React.PropTypes.bool.isRequired
  },
  
  getInitialState: function () {
    return {
      subreddit: this.props.initialSub || 'all'
    };
  },
  
  componentDidMount: function () {
    SettingsStore.addChangeListener(this._handleSettingsChange);
  },
  
  componentWillUnmount: function () {
    SettingsStore.removeChangeListener(this._handleSettingsChange);
  },
  
  render: function () {
    return (
      <div className='subreddit-input'>
        <span className='subreddit-lbl'>/r/</span>
        <div className='subreddit-input-inner'>
          <input type='text' placeholder='subreddit'
            value={ this.state.subreddit } onKeyUp={ this._handleSubredditEnter } onChange={ this._handleSubredditChange } />
        </div>
      </div>
    );
  },
  
  /* Private functions
   --------------------------------------------------------------------------*/
  _handleSubredditEnter: function (evt) {
    var settings;
    
    if (evt.keyCode == 13 && evt.target.value.trim() !== '') {
      PostsActions.setSubreddit(evt.target.value);
      
      if (this.props.savePreviousSub) {
        settings = SettingsStore.getSettings();
        
        settings.previousSub = evt.target.value;
        SettingsActions.updateSettings({
          settings: settings,
          subreddit: evt.target.value
        });
      }
    }
  },
  
  _handleSubredditChange: function (evt) {
    this.setState({
      subreddit: evt.target.value
    });
  },
  
  _handleSettingsChange: function () {
    if (SettingsStore.getSettings().previousSub !== null) {
      this.setState({
        subreddit: SettingsStore.getSettings().previousSub
      });
    }
  }
});

module.exports = SubredditInput;