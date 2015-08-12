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
  
  extractDomain: function (urlStr) {
    var url = new URL(urlStr);
    
    return url.host;
  },
  
  getShortPrettyStr: function (str, len) {
    var short = str;
    
    if (short.length > len) {
      short = short.substr(0, len) + '…';
    }
    
    return short;
  },
  
  getPreviewImgUrl: function (post) {
    var url    = post.url,
        domain = Util.extractDomain(url),
        ext    = url.split('.').pop(),
        source;
    
    if ((domain === 'i.imgur.com' || domain === 'imgur.com') && ['jpg', 'png', 'gif'].indexOf(ext.toLowerCase()) >= 0) {
      source = url;
    } else if (domain === 'i.imgur.com' || domain === 'imgur.com') {
      if (ext === 'gifv') {
        source = url.replace('.gifv', '') + '.gif';
      } else if (/(\?gallery$)/.test(url) && post.preview && post.preview.images &&
          post.preview.images[0] && post.preview.images[0].source &&
          post.preview.images[0].source.url) {
        source = post.preview.images[0].source.url;
      } else {
        source = url + '.jpg';
      }
    } else if (['jpg', 'png', 'gif'].indexOf(ext.toLowerCase()) >= 0) {
      source = url;
    } else if (post.preview && post.preview.images &&
        post.preview.images[0] && post.preview.images[0].source &&
        post.preview.images[0].source.url) {
      source = post.preview.images[0].source.url;
    }
    
    return source;
  }
};

module.exports = Util;