const { Router } = require('express');
const { getUsers, postUser } = require('../controllers/user');
const router = Router();

router.get('/', getUsers);
router.post('/', postUser);

module.exports = router;
