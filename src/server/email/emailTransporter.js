const nodemailer = require('nodemailer');
const config = require('../config/config');

function send(subject, body, from, callback) {
  var smtpTransport = nodeMailer.createTransport(config.smtpConfig);
  var mailOptions = { 
      to: config.emailTo,
      from: 'MK',
      subject: 'MK',
      html: 'TEST'
  };
  smtpTransport.sendMail(mailOptions, function(err, response) {
      callback(err);
  });
}

module.exports = { 
  send: send
}