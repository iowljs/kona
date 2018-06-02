/**
 * @package kona
 * @license MIT
 */

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

module.exports = class GatewayServer {
    /**
     * @description This constructor will initialize everything, and provide a "gateway" between every module, including other controllers, storage, models and more.
     * @constructor
     */
    constructor() {
        this.express        = express;
        this.app            = app;
        this.path           = path;
        this.fs             = fs;
        this.models         = {};
        this.controllers    = {};
        this.paths          = {
            MIDDLEWARE: path.join(__dirname, '../../modules/middleware'),
            CONTROLLERS: path.join(__dirname, '../../controllers'),
            MODELS: path.join(__dirname, '../../models')
        };
        this._prepMiddleware();
        this._prepModels();
        this._prepControllers();
        this._prepAutomagicLoading();
    }
    /**
     * @method getModels
     * @description This is a getter, it will return the found and loaded modules.
     * @return {object}
     */
    getModels() {
        return this.models;
    }
    /**
     * @method getControllers
     * @description This is a getter, it will return the found and loaded controllers.
     * @return {object}
     */
    getControllers() {
        return this.controllers;
    }
    /**
     * @method _prepAutomagicLoading
     * @description This will find all the controllers from the controllers list, it will try to match the controllers lowercased name, and try an action on said controller. It will fallback if not found, or response with action reply.
     * @private
     */
    _prepAutomagicLoading() {
        let keys = Object.keys(this.getControllers());
        this.app.use((req, res, next) => {
            keys.forEach(title => {
                if(req.url.indexOf(`/${title}/`) > -1) {
                    var url = req.url;
                    var parts = req.url.split('/');
                    var nextpart = false;
                    parts.forEach(part => {
                        if(nextpart) {
                            try {
                                this.controllers[title].invokeLocalMethod(part, req, res);
                            } catch(error) {
                                console.log('Failed to invoke method ' + part + ' on controller ' + title);
                                return next();
                            }
                        }
                        else if(part.toLowerCase() === title.toLowerCase()) {
                            nextpart = true;
                        }
                    });
                }
            })
            next();
        })
    }
    /**
     * @method getEmailService
     * @description This will return the email service, with configuration pre-loaded.
     * @return {object}
     */
    getEmailService() {
        return require(path.join(__dirname, '../../modules/services/email'))(require(path.join(__dirname, '../../config/email')));
    }
    /**
     * @method enableAnalytics
     * @description This will enable the analytics middleware
     */
    enableAnalytics() {
        require(
            this.path.join(
                __dirname,
                '../../modules/services/analytics'
            )
        )(this);
    }
    /**
     * @method serve
     * @description Start the express web server, and listen on the specified port!
     * @param {object} config Optional, additional configuration for service mode, bumping the port number by 1, and listening
     * @param {number} port The port number to listen on
     */
    serve(config, port = 3001) {
        if(config && config.mode) {
            if(config.mode.toLowerCase() === 'service') {
                port++;
            }
        }
        this.app.listen(port, () => {
            console.log(`Listening on *:${port}`);
        })
    }
    /**
     * @method _prepControllers
     * @description This will automatically find and load the controllers, and dump them into the object {this.controllers}.
     * @private
     */
    _prepControllers() {
        this.fs.readdirSync(this.paths.CONTROLLERS).forEach(path1 => {
            let path_name = path1.replace(/\.js/g, '');
            let obj_raw = require(
                this.path.join(
                    this.paths.CONTROLLERS,
                    '/',
                    path1
                )
            );
            let obj = new obj_raw(this);
            this.controllers[path_name] = obj;
        });
    }
    /**
     * @method _prepModels
     * @description This will act almost indentical to _prepControllers, except for models.
     * @private
     */
    _prepModels() {
        this.fs.readdirSync(this.paths.MODELS).forEach(path1 => {
            let path_name = path1.replace(/\.js/g, '');
            this.models[path_name] = require(
                this.path.join(
                    this.paths.MODELS,
                    '/',
                    path1
                )
            )
        });
    }
    /**
     * @method _prepMiddleware
     * @description This will act almost indentical to _prepModels, except for middleware.
     * @private
     */
    _prepMiddleware() {
        this.fs.readdirSync(this.paths.MIDDLEWARE).forEach(path1 => {
            require(this.path.join(this.paths.MIDDLEWARE, '/', path1))(this.app);
        });
    }
}