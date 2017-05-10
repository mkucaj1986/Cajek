const nodemailer = require('nodemailer');
const config = require('../config/config');

let sendEmail = function(req, res, next) {

    if (!req.body) return res.sendStatus(400);
    let transporter = nodemailer.createTransport(config.email.smtpConfig);
    let mailOptions = {
        to: config.email.emailTo,
        from: req.body.email,
        subject: req.body.email,
        html: req.body.message
    };
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
    });
};
module.exports = sendEmail;
