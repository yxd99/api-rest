const Role = require('../models/role');
const User = require('../models/user');

const validateRole = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no existe en la base de datos.`);
  }
};

const validateEmail = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo ${email} ya se encuentra registrado.`);
  }
};

const validateId = async (id) => {
  const existId = await User.findById(id);
  if (!existId) {
    throw new Error(`El id ${id} no existe.`);
  }
};

module.exports = {
  validateRole,
  validateEmail,
  validateId
};
