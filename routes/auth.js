/**
 * User Routes / Auth
 * host + /api/auth
 */
const router = require('express').Router();
const { body, param, check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post('/new', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Verifica el correo').isEmail(),
  check('password', 'La contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
  validateFields
], createUser);

router.post('/',[
  check('email', 'El email es incorrecto').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields
], loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
