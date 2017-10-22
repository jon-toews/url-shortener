const express = require('express');
const router = express.Router();
const { URL } = require('url');
const url = require('url');

const UrlDoc = require('../models/urlSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//
router.get('/:code', async function redirect(req, res) {
  try {
    const urlDoc = await UrlDoc.findOne({'short_url': req.params.code});
    if (urlDoc) {
      res.redirect(urlDoc.original_url);
    } else {
      res.json({error: `no URL associated with short code: ${req.params.code}`})
    }
  } catch (error) {
    res.render('error', { message: "Something went wrong", error} );
  }
});

router.get('/new/*?', function validateUrl(req, res, next) {
  try {
    const userUrl = new URL(req.params[0]);
    req.userUrl = userUrl;
    next();
  } catch (error) {
    res.json("error", `invalid URL: ${req.params[0]}`);
  }
}, async function saveUrl(req, res) {
  try {
    const urlDoc = await new UrlDoc({original_url: req.userUrl}).save();
    res.json({'original_url': urlDoc.original_url, 'short_url': urlDoc.short_url});
  } catch (error) {
    res.render('error', { message: "Something went wrong", error} );
  }
});

module.exports = router;
