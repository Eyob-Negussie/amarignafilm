const config = require('config');
const mongoose = require('mongoose');

module.exports = async function () {
    await mongoose.connect(`mongodb://${config.get('db.host')}/${config.get('db.database')}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
}