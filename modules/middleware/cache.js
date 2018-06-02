module.exports = app => {
    const compression = require('compression');
    app.use(compression({ filter: shouldCompress }));
    function shouldCompress(req, res) {
        if(req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
    app.use((req, res, next) => {
        if(req.url.indexOf(/\nocache/g) > -1) {
            res.setHeader('Cache-Control', 'no-cache');
        }
        next();
    })
}