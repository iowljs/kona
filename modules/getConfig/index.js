module.exports = key => {
    var state = false;
    const fs = require('fs');
    const path = require('path');
    const base_dir = path.join(__dirname, '../../config/');
    if(fs.existsSync(path.join(base_dir, 'env.js'))) {
        const env = require(path.join(base_dir, 'env.js'));
        if(typeof env[key] !== 'undefined' && env[key]) {
            state = true;
        }
    }
    if(typeof process.env[key] !== 'undefined' && process.env[key]) {
        state = true;
    }
    if(typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV.toLowerCase() === 'production') {
        if(fs.existsSync(path.join(__dirname, 'production.env.js'))) {
           const prodenv = require(path.join(__dirname, 'production.env.js')); 
           if(typeof prodenv[key] !== 'undefined' && prodenv[key]) {
               state = true;
           }
        }
    }
    if(typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV.toLowerCase() === 'staging') {
        if(fs.existsSync(path.join(__dirname, 'staging.env.js'))) {
           const stagingenv = require(path.join(__dirname, 'staging.env.js')); 
           if(typeof stagingenv[key] !== 'undefined' && stagingenv[key]) {
               state = true;
           }
        }
    }
    if(typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV.toLowerCase() === 'development') {
        if(fs.existsSync(path.join(__dirname, 'development.env.js'))) {
           const developmentenv = require(path.join(__dirname, 'development.env.js')); 
           if(typeof developmentenv[key] !== 'undefined' && developmentenv[key]) {
               state = true;
           }
        }
    }
    return state;
}