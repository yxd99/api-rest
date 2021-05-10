const { response } = require('express');
const User = require('../models/user');

const getUsers = (req, res = response) => {
  res.json({
    status: 200
  });
};

const postUser = async (req, res = response) => {
  const body = req.body;
  const user = new User(body);
  await user.save();
  res.json({
    user
  });
};

module.exports = {
  getUsers,
  postUser
};
