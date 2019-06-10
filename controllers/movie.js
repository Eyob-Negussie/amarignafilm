const Joi = require('joi');
const connection = require('../startup/db')();

function getMovies() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM movies';
        connection.query(sql, (error, results) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve(results);
        });
    });
}

function addMovies(movie) {
    return new Promise((resolve, reject) => {
        const result = validateMovies(movie);
        if(result.error){
            reject(result.error.details[0].message);
        }

        const sql = 'INSERT INTO movies SET ?';
        connection.query(sql, movie, (error, result) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve(`${result.insertId}`);
        });
    });
}

function updateMovies(id, movie) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE movies SET ${movie.key} = ? WHERE id = ?`;
        connection.query(sql, [movie.value, id], (error, result) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve(`${id}`);
        });
    });
}


function deleteMovies(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM movies WHERE id = ?';
        connection.query(sql, id, (error, result) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve({success : `Movie with id ${id} is deleted successfully`});
        });
    });
}

function validateMovies(movies) {
    const schema = {
        title: Joi.string().required(),
        genre: Joi.number().required(),
        rentalRate: Joi.number().required().precision(2),
    }

    return Joi.validate(movies, schema);
}

module.exports.getMovies = getMovies;
module.exports.addMovies = addMovies;
module.exports.updateMovies = updateMovies;
module.exports.deleteMovies = deleteMovies;