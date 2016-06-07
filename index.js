'use strict';

var https = require('https');
var xpath = require('xpath');
var Dom = require('xmldom').DOMParser;

var options = {
  host: 'en.wikipedia.org',
  path: '/wiki/Horse',
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
    for (var i = 0; i < nodes.length; i++) {
      value = nodes[i].firstChild.attributes['1'].value;
      match = value.split('–');
      if (match !== null) {
        console.log(
          match[0].trim() +
          ' - ' +
          nodes[i].firstChild.attributes['2'].value);
      }
    }
  });
});
