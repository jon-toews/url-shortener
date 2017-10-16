var express = require('express');
var router = express.Router();

var Url = require('../models/urlSchema');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:test', (req, res) => {

})

module.exports = router;
