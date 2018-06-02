/**
 * @package kona
 * @license MIT
 */

const nodemailer = require('nodemailer');
module.exports = config => {
    return {
        config,
        send: (to, from, subject, content, template = null) => {
            if(template !== null) {
                template = require(path.join(__dirname, '../../../../views/email/' + template + '/'));
                template = template(to, from, subject, content);
            }
            else {
                template = content;
            }
            let self = config
            const transporter = nodemailer.createTransport({
                service: self.smtp.service,
                auth: {
                    user: self.smtp.user,
                    pass: self.smtp.pass
                }
            });
            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
                html: template
            };
            return transporter.sendMail(mailOptions, function(err, info) {
                if(err) {
                    return console.warn(`Error: Failed to send email to ${to}, from ${from}`);
                }
                return console.log(info);
            });
        },
        preview: (to, from, subject, content, template = null) => {
            if(template !== null) {
                template = require(path.join(__dirname, '../../../../views/email/' + template + '/'));
                template = template(to, from, subject, content);
            }
            else {
                template = content;
            }
            return {
                EMAIL_TO: to,
                EMAIL_FROM: from,
                EMAIL_SUBJECT: subject,
                EMAIL_CONTENT: content,
                EMAIL_CONTENT_COMPILED: template
            };
        }
    }
}