'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var vm = {
        title: 'Portfolio'
    };
    res.render('index', vm);
});
/* GET Contact page. */
router.post('/contactForm', function(req, res, next) {
	
});

module.exports = router;