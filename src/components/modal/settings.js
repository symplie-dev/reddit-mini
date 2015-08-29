var React            = require('react'),
    cx               = require('classnames'),
    $                = require('jquery'),
    assign           = require('object-assign'),
    ModalCtrls       = require('./modal-ctrls'),
    SettingsStore    = require('../../stores/settings'),
    SettingsActions  = require('../../actions/settings'), 
    SettingsModal;

SettingsModal = React.createClass({
  getInitialState: function () {
    return {
      settings: SettingsStore.getSettings(),
      tmpSettings: assign({}, SettingsStore.getSettings())
    }
  },
  
  componentDidMount: function () {
    SettingsStore.addChangeListener(this._handleModalChange);
  },

  componentWillUnmount: function () {
    SettingsStore.removeChangeListener(this._handleModalChange);
  },
  
  remove: function () {
    $('.modal-outer').removeClass('fade-in-down').addClass('fade-out-up');
    
    setTimeout(function () {
      React.unmountComponentAtNode(document.getElementById('settingsModalContainer'));
    }, 400);
  },
  
  handleCancel: function () {
    this.remove();
  },
  
  handleSave: function () {
    SettingsActions.updateSettings({ settings: this.state.tmpSettings });
    this.remove();
  },
    
  render: function () {    
    return (
      <div className='modal-wrapper'>
        <div className='modal-outer fade-in-down animated'>
          <div className='modal-middle'>
            <div className='emoticon-detail-modal modal animated-long'>
              <div className='modal-inner'>
                <h1>Settings</h1>
                <div className='modal-body'>
                  <div className='modal-body-row'>
                    <div className='modal-body-lbl'>Number of posts</div>
                    <div className='modal-body-val'>
                      <select value={ this.state.tmpSettings.numPosts } onChange={ this._handleNumPostsChange }>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                      </select>
                    </div>
                  </div>
                  <div className='modal-body-row'>
                    <div className='modal-body-lbl'>Start with last viewed subreddit</div>
                    <div className='modal-body-val'>
                      <input type='checkbox' defaultChecked={this.state.tmpSettings.savePreviousSub} onChange={this._handleSavePreviousSubChange} />
                    </div>
                  </div>
                  <div className='modal-body-row'>
                    <div className='modal-body-lbl'>Expand images</div>
                    <div className='modal-body-val'>
                      <input type='checkbox' defaultChecked={this.state.tmpSettings.showImages} onChange={this._handleShowImagesChange} />
                    </div>
                  </div>
                  <div className='modal-body-row'>
                    <div className='modal-body-lbl'>Expand <span className='nsfw-tag'>NSFW</span> images</div>
                    <div className='modal-body-val'>
                      <input type='checkbox' defaultChecked={this.state.tmpSettings.showNsfwImages} onChange={this._handleShowNsfwChange} />
                    </div>
                  </div>
                </div>
                
                <ModalCtrls handleClickLeftBtn={ this.handleCancel } handleClickRightBtn={ this.handleSave } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  
  /* Private Functions
  ---------------------------------------------------------------------------*/
  _handleModalChange: function () {
    this.setState({
      settings: SettingsStore.getSettings(),
      tmpSettings: assign({}, SettingsStore.getSettings())
    });
  },
  
  _handleShowImagesChange: function (evt) {
    var tmpSettings = this.state.tmpSettings;
    
    tmpSettings.showImages = evt.target.checked;
    this.setState({
      tmpSettings: tmpSettings
    });
  },
  
  _handleShowNsfwChange: function (evt) {
    var tmpSettings = this.state.tmpSettings;
    
    tmpSettings.showNsfwImages = evt.target.checked;
    this.setState({
      tmpSettings: tmpSettings
    });
  },
  
  _handleNumPostsChange: function (evt) {
    var tmpSettings = this.state.tmpSettings;
    
    tmpSettings.numPosts = parseInt(evt.target.value);
    this.setState({
      tmpSettings: tmpSettings
    });
  },
  
  _handleSavePreviousSubChange: function (evt) {
    var tmpSettings = this.state.tmpSettings;
    
    if (tmpSettings) {
      tmpSettings.savePreviousSub = evt.target.checked;
      this.setState({
        tmpSettings: tmpSettings
      });
    }
  }
});

module.exports = SettingsModal;
