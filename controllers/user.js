const Joi = require('joi');
const connection = require('../startup/db')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

function getUsers() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
        connection.query(sql, (error, results) => {
            if (error){
                return reject(error.sqlMessage);
            }
            return resolve(results);
        });
    });
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        connection.query(sql, id,(error, results) => {
            if (error){
                return reject(error.sqlMessage);
            }

            if(!(Array.isArray(results) && results.length)){
                return reject("User not found");
            }
            return resolve(results[0]);
        });
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, email,(error, results) => {
            if (error){
                return reject(error.sqlMessage);
            }
            if(!(Array.isArray(results) && results.length)){
                return reject("User not found");
            }
            return resolve(results[0]);
        });
    });
}

function addUsers(user){
    return new Promise(async (resolve, reject) => {
        const result = validateUsers(user);
        if(result.error){
            return reject(result.error.details[0].message);
        }

        const singleUser = await getUserByEmail(user.email);
        if((Array.isArray(singleUser) && singleUser.length)){
            return reject("User already Registered");
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const sql = 'INSERT INTO users SET ?';
        connection.query(sql, user, (error, result) => {
            if (error){
                return reject(error.sqlMessage);
            }
            const token = jwt.sign({id: singleUser.id}, config.get('jwtPrivateKey'));
            return resolve({
                id: `${result.insertId}`,
                token: token
            });
        });
    });
}

function updateUsers(id, user) {
    return new Promise(async (resolve, reject) => {

        if(user.key === 'password'){
            const salt = await bcrypt.genSalt(10);
            user.value = await bcrypt.hash(user.value, salt);
        }

        const sql = `UPDATE users SET ${user.key} = ? WHERE id = ?`;
        connection.query(sql, [user.value, id], (error, result) => {
            if (error){
                return reject(error.sqlMessage);
            }
            return resolve(`${id}`);
        });
    });
}


function deleteUsers(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        connection.query(sql, id, (error, result) => {
            if (error){
                return reject(error.sqlMessage);
            }
            return resolve({success : `Rentals with id ${id} is deleted successfully`});
        });
    });
}

function validateUsers(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }

    return Joi.validate(user, schema);
}

module.exports.getUsers = getUsers;
module.exports.addUsers = addUsers;
module.exports.updateUsers = updateUsers;
module.exports.deleteUsers = deleteUsers;
module.exports.getUser = getUser;
module.exports.getUserByEmail = getUserByEmail;