const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const users = require('../controllers/user');

function authUser(user){
    return new Promise(async (resolve, reject) => {
        const result = validateCredential(user);
        if(result.error){
            return reject(result.error.details[0].message);
        }

        const singleUser = await users.getUserByEmail(user.email);
        if(!(singleUser && singleUser.id)){
            return reject("Invalid email or password");
        }
        const validPassword = await bcrypt.compare(user.password, singleUser.password);

        if(!validPassword){
            return reject("Invalid email or password");
        }

        const token = jwt.sign({id: singleUser.id}, config.get('jwtPrivateKey'));
        return resolve({
            user: singleUser,
            token: token
        });
    });
}

function validateCredential(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }

    return Joi.validate(user, schema);
}

module.exports.authUser = authUser;