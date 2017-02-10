const nodemailer = require('nodemailer');
const config = require('../config/config');

let sendEmail = function(req, res, next) {
    let transporter = nodemailer.createTransport(config.email.smtpConfig);
    let mailOptions = {
        to: config.email.emailTo,
        from: req.body.email,
        subject: req.body.email,
        html: req.body.message
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        res.status(200).json({ success: (error == undefined) });
    });
}

module.exports = sendEmail;
