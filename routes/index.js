'use strict';

var express = require('express');
var router = express.Router();
var translator = require('../utils/translator.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.q && req.query.lang) {
    translator.get(req.query.q, req.query.lang, function(err, array) {
      var result = array;
      if (err) {
        result = {};
      }
      if (req.query.to) {
        result = array[req.query.to] || {};
      }
      if (req.query.output && req.query.output === 'json') {
        res.json(result);
      } else {
        res.render('index', {
          query: req.query.q,
          lang: req.query.lang,
          to: req.query.to,
          result: JSON.stringify(result, null, 2),
        });
      }
    });
  } else {
    res.render('index', {
      query: '',
      lang: '',
      to: '',
      result: '',
    });
  }
});

/* POST query */
router.post('/', function(req, res, next) {
  if (!req.body) {
    return next(new Error('No file have been provided.'));
  }
  if (!req.params.lang) {
    return next(new Error('No language have been provided.'));
  }

});

module.exports = router;
