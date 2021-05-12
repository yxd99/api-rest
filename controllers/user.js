const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUser = async (req = request, res = response) => {
  const { limitQuery = 5, sinceQuery = 0 } = req.query;
  const query = { state: true };
  const limit = Number(limitQuery);
  const since = Number(sinceQuery);
  if (limit < 1 || limit > 50) {
    res.json({
      msg: 'El limite debe estar en un rango de 1 a 50'
    });
  }
  if (since < 0) {
    res.json({
      msg: 'El valor donde desea comenzar debe ser mayor o igual a 0.'
    });
  }
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit))
  ]);
  res.json({ total, users });
};

const postUser = async (req, res = response) => {
  const { name, email, role, password } = req.body;
  const user = new User({ name, email, role, password });
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  await user.save();
  res.json(user);
};

const putUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...info } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    info.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, info);
  res.status(200).json({
    user
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({
    user
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser
};
