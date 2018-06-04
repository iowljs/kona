const Sequelize = require('sequelize');
const SQLEngineQueryBuilder = require('./querybuilder');
module.exports = class SQLEngine {
    constructor(config) {
        this.reinitialize(config);
    }
    reinitialize(config) {
        const sequelize = new Sequelize(config.database.uri, config.database.username, config.database.password, {
            host: config.database.hostname,
            dialect: config.database.dialect || 'postgres',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });
        this.sequelize = sequelize;
    }
    getQueryBuilder() {
        return new SQLEngineQueryBuilder();
    }
    getSequelize() {
        return this.sequelize;
    }
}