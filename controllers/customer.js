const Joi = require('joi');
const connection = require('../startup/db')();

function getCustomer() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM customers';
        connection.query(sql, (error, results) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve(results);
        });
    });
}

function addCustomer(customer) {

    return new Promise((resolve, reject) => {
        const result = validateCustomer(customer);
        console.log(result);
        if(result.error){
            reject(result.error.details[0].message);
        }

        const sql = 'INSERT INTO customers SET ?';
        connection.query(sql, customer, (error, result) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve(`1`);
        });
    });

}
function updateCustomer(id, customer) {
    return new Promise((resolve, reject) => {

        const sql = `UPDATE customers SET ${customer.key} = ? WHERE id = ?`;
        connection.query(sql, [customer.value, id], (error, result) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve(`${id}`);
        });
    });
}


function deleteCustomer(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM customers WHERE id = ?';
        connection.query(sql, id, (error, result) => {
            if (error){
                reject(error.sqlMessage);
            }
            resolve({success : `Customer with id ${id} is deleted successfully`});
        });
    });
}

function validateCustomer(customer) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        phone: Joi.string().min(10).max(10).required(),
    }

    return Joi.validate(customer, schema);
}

module.exports.getCustomer = getCustomer;
module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.deleteCustomer = deleteCustomer;