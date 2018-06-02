module.exports = server => {
    let app = server.app;
    app.use((req, res, next) => {
        if(typeof server.models.analytics !== 'undefined') {
            server.models.analytics.addInformation(
                'INCOMING_REQUEST',
                {
                    USER_IP_ADDRESS: req.connection.remoteAddress,
                    HEADERS: req.headres
                }
            )
        }
        next();
    });
}