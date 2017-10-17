var express = require('express');
var router = express.Router();

var Url = require('../models/urlSchema');

const testdb = async(req, res) => {
  const url = await new Url({original_url: 'test'}).save();

  console.log(url);
  res.send('wow');
  
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:test', testdb)

module.exports = router;
