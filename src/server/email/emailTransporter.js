/*jshint esversion: 6 */
const nodemailer = require('nodemailer');
const config = require('../config/config');
const sendinBlue = require('nodemailer-sendinblue-transport');

let sendEmail = function(req, res, next) {

    if (!req.body) return res.sendStatus(400);
    let transporter = nodemailer.createTransport(sendinBlue(config.email.sendinBlue));
    let mailOptions = {
        to: config.email.emailTo,
        from: req.body.email,
        subject: req.body.email,
        html: req.body.message
    };
    // verify connection configuration
    transporter.verify(function(error, success) {
       if (error) {
            console.log(error);
            res.status(401).json({ err: error });
       } else {
            console.log('Server is ready to take our messages');
       }
    });
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.status(401).json({ err: info });
        }
        if (!res.headersSent) {
            res.status(200).json({ success: true });
        } else {
            next();
        }
        res.send(info);
        transporter.close();
    });
};
module.exports = sendEmail;
