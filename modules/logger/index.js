/**
 * @package kona
 * @license MIT
 */

const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json,
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

// const DailyRotateFile = require('winston-daily-rotate-file');
// logger.configure({
//     level: 'verbose',
//     transports: [
//         new DailyRotateFile({
//             filename: 'application-%DATE%.log',
//             datePattern: 'YYYY-MM-DD-HH',
//             zippedArchive: true,
//             maxSize: '10m',
//             maxFiles: '14d'
//         });
//     ]
// })

module.exports = logger;