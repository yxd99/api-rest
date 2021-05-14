const { response } = require('express');

const isAdmin = (req, res = response, next) => {
  if (!req.userAuth) {
    return res
      .status(500)
      .json({ msg: 'No se ha verificado el token correctamente.' });
  }
  const { state, name } = req.userAuth;
  if (state !== 'admin') {
    return res
      .status(401)
      .json({ msg: `${name} no tiene permiso para realizar está petición.` });
  }
  next();
};

const includeRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.userAuth) {
      return res
        .status(500)
        .json({ msg: 'No se ha verificado el token correctamente.' });
    }
    if (!roles.includes(req.userAuth.role)) {
      return res
        .status(401)
        .json({ msg: 'No tiene privilegio para hacer está petición.' });
    }
    next();
  };
};

module.exports = {
  isAdmin,
  includeRole
};
