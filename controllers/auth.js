const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
    token
  });
};

const googleSignin = async (req = request, res = response) => {
  const { idToken } = req.body;
  const { email, name, img } = await googleVerify(idToken);
  let user = await User.findOne({ email });
  if (!user) {
    const data = {
      name,
      img,
      email,
      password: 'isRegistered',
      google: true
    };
    user = await User(data);
    await user.save();
  }
  if (!user.state) {
    return res
      .status(401)
      .json({
        msg: 'Contacte con el administrador del sistema.'
      });
  }
  const token = await generateToken(user.id);
  return res.json({
    email,
    token
  });
};

module.exports = {
  postAuth,
  googleSignin
};
