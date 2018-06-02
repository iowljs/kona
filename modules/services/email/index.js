/**
 * @package kona
 * @license MIT
 */

module.exports = config => {
    return {
        smtp: require('./nodemailer')(config)
    }
}