const Joi = require('joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            firstName: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            lastName: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 255,
            },
            phone: {
                type: String,
                required: true,
                minlength: 10,
                maxlength: 10,
            },
            isGold: {
                type: Boolean,
                default: false
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 255
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                minlength: 0,
                maxlength: 255
            }
        }),
        required: true,
        dateOut: {
            type: Date,
            required: true,
            default: Date.now
        },
        dateReturned:{
            type: Date
        },
        rentalFee:{
            type: Number,
            min: 0
        }
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;

