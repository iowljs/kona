/**
 * @package kona
 * @license MIT
 * - - - - - - - - - - - -
 * - - - - K O N A - - - -
 * - - - - - - - - - - - -
 * A simple REST backend.
 * And, it scales.
 */
// @import getConfig
const getConfig = require('../modules/getConfig');
// @import gateway-server
const WebServer = require('../modules/gateway-server');
// @instantiate WebServer
const server = new WebServer();
// @note enable analytics if this is flagged, otherwise, do not enable
if(getConfig(`ENABLE_ANALYTICS`)) {
    server.enableAnalytics();
}
// @note start the server
server.serve();