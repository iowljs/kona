/**
 * @package kona
 * @license MIT
 */

const RequestObject = require('../raw');
const request = require('request');
module.exports = class GetRequest extends RequestObject {
    send(callback) {
        const params = this.parameters;
        var param_string = '?sr=true';
        params.forEach(param_object => {
            // param_name, param_value
            param_string += '&' + param_object.param_name + '=' + param_object.param_value;
        });
        param_string = encodeURIComponent(param_string);
        request(this.path + param_string, function (error, response, body) {
            if(error) {
                return callback({ has_error: true, error });
            }
            if(response && response.statusCode !== 200) {
                return callback({ has_error: true, error: 'Status is not 200.', response });
            }
            callback({ body });
        });
    }
}