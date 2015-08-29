'use strict';

var Q                 = require('q'),
    SettingsConstants = require('../constants/settings'),
    Dao;

Dao = {  
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