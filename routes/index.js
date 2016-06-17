'use strict';

var express = require('express');
var formidable = require('formidable');
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
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var result = {};
    translator.filter(
      files.file.path,
      fields.lang,
      fields.to,
      function(err, trans) {
        if (err) {
          result = {};
        } else {
          result = trans;
        }
        res.render('index', {
          lang: fields.lang,
          to: fields.to,
          resultF: JSON.stringify(result, null, 2),
        });
      });
  });
});

module.exports = router;
