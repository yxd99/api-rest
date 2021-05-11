const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Campo requerido.']
  },
  email: {
    type: String,
    required: [true, 'Campo requerido.']
  },
  password: {
    type: String,
    required: [true, 'Campo requerido.']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    emun: ['admin', 'user']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model('User', UserSchema);
