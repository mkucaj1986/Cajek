const express = require('express');
const router = express.Router();
const config = require('../config/config');
const sendEmail = require('../email/emailTransporter');
const nodemailer = require('nodemailer');
/* Set HEaders. */
router.use('/*', function(req, res, next) {
    res.setHeader('Cache-Control', 'public, max-age=864000');
    res.setHeader("Content-Type", "text/html");
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var vm = {
        title: 'Portfolio'
    };
    res.render('index.hbs', vm);
});

/* GET portfolio. */
router.get('/portfolio', function(req, res, next) {
    var vm = {
        title: 'portfolioPage'
    };
    res.render('portfolio.hbs', vm);
});

/* SEND EMAIL . */
router.post('/contactForm', sendEmail);

module.exports = router;
