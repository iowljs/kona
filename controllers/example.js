/**
 * @package kona
 * @license MIT
 */
const path = require('path');
const BaseController = require(path.join(__dirname, '/BaseController'));
module.exports = class ExampleController extends BaseController {
    testMethod(req, res) {
        res.send('This is from testMethod in ExampleController');
    }
}