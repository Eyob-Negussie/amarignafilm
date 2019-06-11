const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
    dateOfBirth: {
        type: Date,
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
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;