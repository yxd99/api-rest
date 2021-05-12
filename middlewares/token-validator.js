const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateToken = async (req = request, res = response, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ msg: 'No se encontro el token.' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEYTOKEN);
    const infoUser = await User.findById(uid);
    if (!infoUser) {
      return res.status(401).json({
        msg: 'Token no válido.'
      });
    }
    if (!infoUser.state) {
      return res.status(401).json({
        msg: 'Token no válido.'
      });
    }
    req.userAuth = infoUser;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token no válido.' });
  }
};

module.exports = {
  validateToken
};
