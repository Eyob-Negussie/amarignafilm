const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genres');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(genre) {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    };

    return  Joi.validate(genre, schema);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;