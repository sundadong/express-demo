var express = require('express');
var router = express.Router();
var version = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {title: 'Users', version: version});
});

module.exports = router;
