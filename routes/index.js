var express = require('express');
var router = express.Router();

var Url = require('../models/urlSchema');

function testdb(req, res) {
  const url = new Url({original_url: req.params.test});
  url.save(function(err, data) {
    if (err) console.log(err);
  });
  res.send('wow');
  
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:test', testdb)

module.exports = router;
