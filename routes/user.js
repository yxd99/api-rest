const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { getUser, postUser, putUser } = require('../controllers/user');
const {
  validateRole,
  validateEmail,
  validateId
} = require('../helpers/db-validator');
const router = Router();

router.get('/', getUser);
router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres.').isLength(
      {
        min: 6
      }
    ),
    check('email', 'El correo no es válido.').custom(validateEmail).isEmail(),
    check('role').custom(validateRole),
    fieldValidator
  ],
  postUser
);
router.put(
  '/:id',
  [
    check('id', 'El id no es válido.').isMongoId(),
    check('id').custom(validateId),
    fieldValidator
  ],
  putUser
);

module.exports = router;
