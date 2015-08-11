var Util = {
  getReadableTimePassed: function (time) {
    var now  = Math.floor(Date.now() / 1000),
        diff = now - time,
        diffStr = '0 seconds';
    
    if (diff < 60) {
      diffStr = diff + ' second';
      diffStr += ((diff > 1) ? 's' : '');
    } else if (diff / 60 < 60) {
      diff = Math.floor(diff / 60)
      diffStr = diff + ' minute';
      diffStr += ((diff > 1) ? 's' : '');
    } else if (diff / 60 / 60 < 24) {
      diff = Math.floor(diff / 60 / 60);
      diffStr = diff + ' hour';
      diffStr += ((diff > 1) ? 's' : '');
    }  else if (diff / 60 / 60 / 24 < 365) {
      diff = Math.floor(diff / 60 / 60 / 24);
      diffStr = diff + ' day';
      diffStr += ((diff > 1) ? 's' : '');
    } else {
      diff = Math.floor(diff / 60 / 60 / 24 / 365);
      diffStr = diff + ' year';
      diffStr += ((diff > 1) ? 's' : '');
    }
    
    return diffStr;
  },
  
  getShortPrettyStr: function (str, len) {
    var short = str;
    
    if (short.length > len) {
      short = short.substr(0, len) + '…';
    }
    
    return short;
  }
};

module.exports = Util;