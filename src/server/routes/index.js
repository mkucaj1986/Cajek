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
router.get('/contactForm', function(req, res, next) {
	var vm = {
	    title: 'Contact Page'
	};
    res.render('contactForm', vm);
});

module.exports = router;