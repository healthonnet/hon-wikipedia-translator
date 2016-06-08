'use strict';

var https = require('https');
var Reader = require('line-by-line');
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

  filter: function(file, i18nOrigin, i18nDest, callback) {
    if (!file || !i18nOrigin || !i18nDest) {
      return callback(new Error('Not enough params.'));
    }

    var lr = new Reader(file);
    var res = [];
    var split;

    lr.on('error', function(err) {
      callback(err);
    });

    lr.on('line', function(line) {
      lr.pause();
      split = line.split(':');
      // TODO: fix it.
      // module.exports.get(split[0], i18nOrigin, function(err, arr) {
      //   if (arr[i18nDest]) {
      //     res.push(arr[i18nDest] + ':' + split[1]);
      //   } else {
      //     res.push(split[0] + ':' + split[1]);
      //   }
      //   lr.resume();
      // });
      lr.resume();
    });

    lr.on('end', function() {
      callback(null, res);
    });
  },
};
