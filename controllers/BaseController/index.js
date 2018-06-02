module.exports = class BaseController {
    constructor(server) {
        this.server = server;
    }
    invokeLocalMethod(method, req, res) {
        if(typeof this[method] !== 'undefined') {
            this[method](req, res);
            return true;
        }
        else {
            return false;
        }
    }
}