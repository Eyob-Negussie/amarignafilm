const config = require('config');
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    // connect to db
    const db = config.get('db');
    console.log('DBDBDBDBD',db);
    mongoose.connect((db), {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(() => winston.info(`Connected to ${db}...`))
        .catch((ex) => console.log('Connection to the database failed', ex));
}