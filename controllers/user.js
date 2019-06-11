const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {User, validate} = require('../models/user');

async function getUsers() {
    return await User.find().sort('name');
}

async function getUser(id) {
    console.log('MMMMMMMMMMMMMMMMMMMMM', id);
    const user = await User.findById(id);
    console.log('MMMMMMMMMMMMMMMMMMMMM', user);
    if(!user){
        throw new Error('The user with the given ID was not found.');
        return;
    }

    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    if(!user){
        throw new Error('The user with the given Email was not found.');
        return;
    }

    return user;
}

async function addUsers(user){
    const {error} = validate(user);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    let newUser = await User.findOne({ email: user.email });
    if(newUser){
        throw new Error('User already Registered');
        return;
    }

    newUser = new User(user);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(user.password, salt);
    await newUser.save();

    const token = newUser.generateAuthToken();
    return {
        token: token,
        user : newUser
    }
}

async function updateUsers(id, user, isPassword) {
    const {error} = validate(user);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    let newPassword;
    if(isPassword){
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(user.password, salt);
    }

    let updatedUser = await User.findByIdAndUpdate(id, {
        name: user.name,
        email: user.email,
        password: newPassword ? newPassword : user.password,
        isAdmin: user.isAdmin,
    });

    if(!updatedUser){
        throw new Error('The user with the given ID was not found.');
        return;
    }

    return updatedUser;
}


async function deleteUsers(id) {
    const user = await User.findByIdAndRemove(id);

    if(!user){
        throw new Error('The user with the given ID was not found.');
        return;
    }

    return user;
}

module.exports.getUsers = getUsers;
module.exports.addUsers = addUsers;
module.exports.updateUsers = updateUsers;
module.exports.deleteUsers = deleteUsers;
module.exports.getUser = getUser;
module.exports.getUserByEmail = getUserByEmail;