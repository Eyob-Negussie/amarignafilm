const config = require('config');
const mongoose = require('mongoose');

module.exports = async function () {
    await mongoose.connect(`${config.get('db')}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
}