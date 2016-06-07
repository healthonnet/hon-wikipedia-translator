'use strict';

var express = require('express');
var router = express.Router();
var translator = require('../utils/translator.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.q && req.query.lang) {
    translator.get(req.query.q, req.query.lang, function(err, array) {
      if (err) { return res.json({err: err}); }
      res.json(array);
    });
  } else {
    res.render('index', {params: req.query});
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
