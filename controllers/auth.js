const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');

async function authUser(user){
    const {error} = validateCredential(user);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    const singlrUser = await User.findOne({email: user.email});
    if(!singlrUser){
        throw new Error('Invalid email or password.');
        return;
    }

    const validPassword = await bcrypt.compare(user.password, singlrUser.password);
    if(!validPassword){
        throw new Error('Invalid email or password.');
        return;
    }

    const token = singlrUser.generateAuthToken();
    return {
        user: singlrUser,
        token: token
    }
}

function validateCredential(user) {
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(user, schema);
}

module.exports.authUser = authUser;