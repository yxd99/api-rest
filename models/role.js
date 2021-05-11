const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'El nombre del rol es requerido.']
  }
});

module.exports = model('Role', RoleSchema);
