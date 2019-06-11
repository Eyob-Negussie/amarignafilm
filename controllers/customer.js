const{Customer, validate} = require('../models/customer');

async function getCustomer() {
    return await Customer.find().sort('firstName');
}

async function addCustomer(customer) {
    const {error} = validate(customer);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    const newCustomer = new Customer(customer);

    return await newCustomer.save();
}

async function updateCustomer(id, customer) {
    const {error} = validate(customer);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    const updatedCustomer = await Customer.findOneAndUpdate(id, customer, {new: true});
    if(!updatedCustomer){
        throw new Error('The customer with the given ID was not found.');
        return;
    }

    return updatedCustomer;
}


async function deleteCustomer(id) {
    const customer = await Customer.findByIdAndRemove(id);

    if(!customer){
        throw new Error('The customer with the given ID was not found.');
        return;
    }

    return customer;
}

module.exports.getCustomer = getCustomer;
module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.deleteCustomer = deleteCustomer;