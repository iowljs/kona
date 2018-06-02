module.exports = class ExampleController {
    constructor(server) {
        this.server = server;
        this._index();
    }
    _index() {
        this.server.app.get('/', (req, res) => {
            res.send('hello, world!');
        });
    }
    test(req, res) {
        res.send('Local method called');
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