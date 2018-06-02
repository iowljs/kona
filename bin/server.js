/**
 * - - - - - - - - - - - -
 * - - - - K O N A - - - -
 * - - - - - - - - - - - -
 * A simple REST backend.
 * And, it scales.
 */
const getConfig = require('../modules/getConfig');
const WebServer = require('../modules/gateway-server');
const server = new WebServer();
if(getConfig(`ENABLE_ANALYTICS`)) {
    server.enableAnalytics();
}
server.serve();