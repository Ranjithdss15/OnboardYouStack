var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect('/bitbucket')
});
router.get('/bitbucket.js', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public','javascripts','bitbucket.js'));
  });

module.exports = router;
