const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const Fawn = require('fawn');
const mongoose = require('mongoose');

Fawn.init(mongoose);

async function getRentals() {
    return await Rental.find().sort('dateOut');
}

async function addRentals(rental) {
    const { error } = validate(rental);
    if (error){
        throw new Error(error.details[0].message);
        return;
    }

    const customer = await Customer.findById(rental.customerId);
    if(!customer){
        throw new Error('Invalid customer.');
        return;
    }

    const movie = await Movie.findById(rental.movieId);
    if(!movie){
        throw new Error('Invalid movie.');
        return;
    }

    if(movie.numberInStock === 0){
        throw new Error('Movie not in stock.');
        return;
    }

    let newRental = new Rental({
        customer: {
            _id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', newRental)
            .update('movies', {_id: movie._id},{
                $inc: {numberInStock: -1}
            })
            .run()

        return newRental;
    }catch (ex) {
        throw new Error(ex)
    }
}

function updateRentals(id, rental) {
    //TODO
}


function deleteRentals(id) {
    // TODO
}


module.exports.getRentals = getRentals;
module.exports.addRentals = addRentals;
// module.exports.updateRentals = updateRentals;
// module.exports.deleteRentals = deleteRentals;