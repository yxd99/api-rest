const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../helpers/generate-jwt');

const postAuth = async (req = request, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ msg: 'Correo o contraseña no son correctos.' });
  }
  if (!user.state) {
    return res
      .status(400)
      .json({ msg: 'Correo o contraseña no son correctos.' });
  }
  const validatePassword = bcryptjs.compareSync(password, user.password);
  if (!validatePassword) {
    return res
      .status(400)
      .json({ msg: 'Correo o contraseña no son correctos.' });
  }
  const token = await generateToken(user.id);
  res.json({
    email,
    password,
    token
  });
};

module.exports = {
  postAuth
};
