const sgMail = require('@sendgrid/mail');
const Logger = require('../../logger/logger');

exports.initialize = function () {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

exports.sendEmail = function(res, msgToSend, successMsg, failureMsg) {
    sgMail.send(msgToSend)
        .then(response => {
            res.status(200).send({
                message: successMsg
            });
        })
        .catch(err => {
            Logger.LOG.error('Failed to send email ' + err);
            return res.status(401).send({
                message: failureMsg
            });
        })
}

exports.validatePassword = function (pwd) {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    lowerCase = lowerCaseLetters.test(pwd)
    upperCase = upperCaseLetters.test(pwd)
    numberCheck = numbers.test(pwd)
    pwdLength = false

    // Validate length
    if (pwd.length >= 8) {
        pwdLength = true;
    } else {
        Logger.LOG.info('Password: Not matching letter count');
    }

    return lowerCase && upperCase && numberCheck && pwdLength;
}

exports.validateEmail = function (mail) {
    if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(mail)) {
        return true;
    } else {
        Logger.LOG.info('Password: Not matching email format');
        return false;
    }
}
