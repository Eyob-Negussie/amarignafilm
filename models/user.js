const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin, name: this.name, email: this.email },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    isAdmin: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
