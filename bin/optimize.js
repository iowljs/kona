/**
 * @package kona
 * @license MIT
 */

 // ---- REQUIRE DEPENDENCIES ---- \\
 const path = require('path');
 const fs   = require('fs');
 // ---- OPTIMIZE AUTOLOADER ---- \\
 const optimize_autoloader = () => {
    let paths = {
        MIDDLEWARE: path.join(__dirname, '..//modules/middleware'),
        CONTROLLERS: path.join(__dirname, '../controllers'),
        MODELS: path.join(__dirname, '../models')
    };
    let controller_paths = [];
    let middleware_paths = [];
    let model_paths = [];
    fs.readdirSync(paths.MODELS).forEach(path1 => {
        let path_name = path1.replace(/\.js/g, '');
        model_paths.push({
            name: path_name,
            file: path.join(paths.MODELS, '/', path1)
        });
    });
    fs.readdirSync(paths.CONTROLLERS).forEach(path1 => {
        let path_name = path1.replace(/\.js/g, '');
        controller_paths.push({
            name: path_name,
            file: path.join(paths.CONTROLLERS, '/', path1)
        });
    });
    fs.readdirSync(paths.MIDDLEWARE).forEach(path1 => {
        let path_name = path1.replace(/\.js/g, '');
        middleware_paths.push({
            name: path_name,
            file: path.join(paths.MIDDLEWARE, '/', path1)
        });
    });
    return {
        controller_paths,
        model_paths,
        middleware_paths
    };
 };
// --- RUNTIME STARTS NOW ---- \\
 let autoload_response = optimize_autoloader();
 const list_object = {
     controllers: autoload_response.controller_paths,
     models: autoload_response.model_paths,
     middleware: autoload_response.middleware_paths
 };
 var autoload_final = JSON.stringify(list_object);
 fs.writeFileSync('config/classmap.json', autoload_final);
