var express = require('express');
var version = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Chat' , version: version});
});

module.exports = router;
