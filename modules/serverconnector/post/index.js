/**
 * @package kona
 * @license MIT
 */

const RequestObject = require('../raw');
const request = require('request');
module.exports = class PostRequest extends RequestObject {
    send(callback) {
        const params = this.parameters;
        const url    = this.path;
        return request.post({ url: path, formData: params }, function (error, response, body) {
            if(error) {
                return callback({ has_error: true, error });
            }
            if(response && response.statusCode !== 200) {
                return callback({ has_error: true, error: 'Status code is not 200', response });
            }
            return callback({ body })
        });
    }
}