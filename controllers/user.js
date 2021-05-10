const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = (req, res = response) => {
  res.json({
    status: 200
  });
};

const postUser = async (req, res = response) => {
  const { name, email, rol, password } = req.body;
  const user = new User({ name, email, rol, password });
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  await user.save();
  res.json({
    user
  });
};

module.exports = {
  getUsers,
  postUser
};
