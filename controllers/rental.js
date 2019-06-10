const Joi = require('joi');
const connection = require('../startup/db')();

function getRentals() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM rentals';
        connection.query(sql, (error, results) => {
            if (error){
                return reject(error.sqlMessage);
            }
            return resolve(results);
        });
    });
}

function addRentals(rental) {
    return new Promise((resolve, reject) => {
        const result = validateRentals(rental);
        if(result.error){
            return reject(result.error.details[0].message);
        }

        const sql = 'INSERT INTO rentals SET ?';
        connection.query(sql, rental, (error, result) => {
            console.log(error);
            if (error){
                return reject(error.sqlMessage);
            }
            return resolve(`${result.insertId}`);
        });
    });
}

function updateRentals(id, rental) {
    return new Promise((resolve, reject) => {

        const sql = `UPDATE rentals SET ${rental.key} = ? WHERE id = ?`;
        connection.query(sql, [rental.value, id], (error, result) => {
            if (error){
                return reject(error.sqlMessage);
            }
            return resolve(`${id}`);
        });
    });
}


function deleteRentals(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM rentals WHERE id = ?';
        connection.query(sql, id, (error, result) => {
            if (error){
                return reject(error.sqlMessage);
            }
            return resolve({success : `Rentals with id ${id} is deleted successfully`});
        });
    });
}

function validateRentals(rental) {
    const schema = {
        customerId: Joi.number().required(),
        movieId: Joi.number().required()
    }

    return Joi.validate(rental, schema);
}

module.exports.getRentals = getRentals;
module.exports.addRentals = addRentals;
module.exports.updateRentals = updateRentals;
module.exports.deleteRentals = deleteRentals;