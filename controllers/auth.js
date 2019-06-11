const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');

async function authUser(user){
    const {error} = validateCredential(user);
    if(error){
        throw new Error(error.details[0].message);
        return;
    }

    const singleUser = await User.findOne({email: user.email});
    if(!singleUser){
        throw new Error('Invalid email or password.');
        return;
    }

    const validPassword = await bcrypt.compare(user.password, singleUser.password);
    if(!validPassword){
        throw new Error('Invalid email or password.');
        return;
    }

    const token = singleUser.generateAuthToken();
    return {
        user: singleUser,
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