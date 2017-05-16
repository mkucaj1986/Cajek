// create reusable transporter object using the default SMTP transport
let config = {
    email: {
        emailTo: 'mkucaj86@gmail.com',
        smtpConfig: {
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'cajekemailservice@gmail.com',
                pass: 'qwe789qwe'
            }
        }
    }
};
module.exports = config;
