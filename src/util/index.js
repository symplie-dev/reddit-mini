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
  
  getMedia: function (post) {
    var galleryRegEx1 = /\/a\//gmi,
        galleryRegEx2 = /\/gallery\//gmi,
        pathArray     = post.url.split('.'),
        ext           = pathArray.pop().toLowerCase(),
        mediaMeta     = {};
        
    if (post.domain === 'imgur.com' || post.domain === 'i.imgur.com') {
      if (galleryRegEx1.test(post.url) || galleryRegEx2.text(post.url)) { // if it contains /a/ or /gallery/ it's a gallery
        mediaMeta.type = 'GALLERY';
        if (Util.postHasPreview(post)) {
          mediaMeta.previewSource = post.preview.images[0].source.url;
        }
      } else if (ext === 'gifv') { 							              // .gifv given we a video tag + preview
        mediaMeta.type = 'VIDEO';
        mediaMeta.source = pathArray.join('.') + '.webm';
        mediaMeta.source2 = pathArray.join('.') + '.mp4';
        if (Util.postHasPreview(post)) {
          mediaMeta.previewSource = post.preview.images[0].source.url;
        }
      } else if (ext === 'gif') {								               // Plain gif given we need a preview
        mediaMeta.type = 'IMAGE';
        mediaMeta.source = post.url;
        if (Util.postHasPreview(post)) {
          mediaMeta.previewSource = post.preview.images[0].source.url;
        }
      } else if (['jpg', 'jpeg', 'png'].indexOf(ext) >= 0) {	// Plain image given
        mediaMeta.type = 'IMAGE';
        mediaMeta.source = post.url;
      } else {												                        // Image needs a file extension
        mediaMeta.type = 'IMAGE';
        mediaMeta.source = post.url + '.jpg';
      }
    } else if (ext === 'gif') {									              // Plain gif given we need a preview
    mediaMeta.type = 'IMAGE';
      mediaMeta.source = post.url;
      if (Util.postHasPreview(post)) {
          mediaMeta.previewSource = post.preview.images[0].source.url;
      }
    } else if (['jpg', 'jpeg', 'png'].indexOf(ext) >= 0) {		// Plain image given (not imgur)
      mediaMeta.type = 'IMAGE';
        mediaMeta.source = post.url;
    } else {
      // Don't show any image
    }
    
    return mediaMeta;
  },

  postHasPreview: function (post) {
    return post && post.preview && post.preview.images &&
    	post.preview.images[0] && post.preview.images[0].source &&
        post.preview.images[0].source.url;
  }
};

module.exports = Util;