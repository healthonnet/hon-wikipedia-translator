'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.q) {
    res.json({
      fr: 'Cheval',
      en: 'Horse',
      it: 'Cavallo',
    });
  } else {
    res.render('index');
  }
});

module.exports = router;
