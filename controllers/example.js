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
    fromModel(req, res) {
        /**
         * This is NOT a practical example
         */
        this.server.getModels().example.writeToRequest(req, res);
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