const jwt = require('jsonwebtoken');

const generateToken = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETKEYTOKEN,
      { expiresIn: '1m' },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateToken
};
