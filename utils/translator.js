'use strict';

var https = require('https');
var xpath = require('xpath');
var Dom = require('xmldom').DOMParser;

module.exports = {
  get: function(word, i18n, callback) {
    if (!word || !i18n) { return callback(new Error('Not enough params.')); }

    var options = {
      host: i18n + '.wikipedia.org',
      path: '/wiki/' + word,
    };

    https.get(options, function(res) {
      var data = '';

      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        var doc = new Dom().parseFromString(data);
        var nodes = xpath.select(
          '//li[contains(@class, \'interlanguage-link\')]',
          doc
        );
        var pattern = /^(.*) -/;
        var match;
        var value;
        var result = {};
        for (var i = 0; i < nodes.length; i++) {
          value = nodes[i].firstChild.attributes['1'].value;
          match = value.split('–');
          if (match !== null) {
            result[nodes[i].firstChild.attributes['2'].value] = match[0].trim();
          }
        }
        callback(null, result);
      });
    });
  },

};
