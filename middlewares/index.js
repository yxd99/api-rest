const fieldValidator = require('../middlewares/field-validator');
const tokenValidator = require('../middlewares/token-validator');
const roleValidator = require('../middlewares/role-validator');

module.exports = {
  ...fieldValidator,
  ...tokenValidator,
  ...roleValidator
};
