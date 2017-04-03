const express = require('express');
const router = express.Router();
const config = require('../config/config');
const sendEmail = require('../email/emailTransporter');
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/*', function(req, res, next) {
    var vm = {
        title: 'Portfolio'
    };
    res.render('index.hbs', vm);
});
/* SEND EMAIL . */
router.post('/contactForm', sendEmail);

module.exports = router;
