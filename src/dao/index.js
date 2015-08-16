'use strict';

var Q   = require('q'),
    SettingsConstants = require('../constants/settings'),
    Dao;

Dao = {
  // /**
  //  * Get all settings.
  //  * 
  //  * @return {Promise<Settings>} The settings object
  //  */
  // getSettings: function () {
  //   var deferred = Q.defer();
    
  //   chrome.storage.sync.get('settings', function (data) {
  //     deferred.resolve(data.settings);
  //   });
    
  //   return deferred.promise;
  // },
  
  // /**
  //  * Set the settings to the given settings object
  //  * 
  //  * @param  {Settings} settings The new settings object
  //  * @return {Promise<Settings>} The default settings 
  //  */
  // setSettings: function (settings) {
  //   var deferred = Q.defer(),
  //       self     = this;
    
  //   chrome.storage.sync.set({ 'settings': settings }, function () {
  //     deferred.resolve(settings);
  //   });
    
  //   return deferred.promise;
  // }
  
  getSettings: function () {
    var deferred = Q.defer();
    
    deferred.resolve(
      JSON.parse(localStorage.getItem('settings'))
    );
    
    return deferred.promise;
  },
  
  setSettings: function (settings) {
    var deferred = Q.defer();
    
    localStorage.setItem('settings', JSON.stringify(settings));
    deferred.resolve(settings);
    
    return deferred.promise;
  }
};

module.exports = Dao;