const { Schema, model } = require('mongoose');

const userSchema = Schema({
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
  rol: {
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

module.exports = model('User', userSchema);
