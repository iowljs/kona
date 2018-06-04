/**
 * @package kona
 * @license MIT
 */

const request = require('request')

module.exports = class RequestObject {
    /**
     * @param {string} path
     */
    constructor(path) {
        this.path = path;
        this.parameters = [];
        this.method = null;
    }
    /**
     * Add a parameter!
     * @param {string} param_name The parameter name to add
     * @param {any} param_value Parameter value to send
     */
    addParam(param_name, param_value) {
        this.parameters.push({
            param_name,
            param_value
        });
    }
    /**
     * Removes a parameter
     * @param {string} param_name Parameter name to remove
     */
    removeParam(param_name) {
        this.parameters.forEach(param => {
            if(param.param_name === param_name) {
                delete this.parameters[param];
            }
        });
    }
    /**
     * Set the request method
     * @param {string} method GET or POST
     */
    setMethod(method = 'GET') {
        this.method = method;
    }
    /**
     * Build the request
     * @description this function is overwritten by sub-classes.
     */
    send() {}
}