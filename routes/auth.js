const { Router } = require('express');
const { check } = require('express-validator');
const { postAuth, googleSignin } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El correo no es válido.').isEmail(),
    check('email', 'El correo es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    fieldValidator
  ],
  postAuth
);

router.post(
  '/google',
  [
    check('idToken', 'El id_token no puede ir vacio').not().isEmpty(),
    fieldValidator
  ],
  googleSignin
);

module.exports = router;
