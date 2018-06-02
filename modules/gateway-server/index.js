const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

module.exports = class GatewayServer {
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
    getModels() {
        return this.models;
    }
    getControllers() {
        return this.controllers;
    }
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
    enableAnalytics() {
        require(
            this.path.join(
                __dirname,
                '../../modules/services/analytics'
            )
        )(this);
    }
    serve(port = 3001) {
        this.app.listen(port, () => {
            console.log(`Listening on *:${port}`);
        })
    }
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
    _prepMiddleware() {
        this.fs.readdirSync(this.paths.MIDDLEWARE).forEach(path1 => {
            require(this.path.join(this.paths.MIDDLEWARE, '/', path1))(this.app);
        });
    }
}