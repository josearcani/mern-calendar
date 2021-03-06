/**
 * Calendar events
 * host + /api/events
 */
const router = require('express').Router();
const { check } = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


// all request must have a token
router.use(validateJWT);

router.get('/', getEvents);

router.post('/',[
  check('title', 'El título es obligatorio').notEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom(isDate),
  check('end', 'Fecha de finalización es obligatoria').custom(isDate),
  validateFields
], createEvent);

router.put('/:id',[
  check('id', 'No es un id válido').isMongoId(),
  check('title', 'El título es obligatorio').notEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom(isDate),
  check('end', 'Fecha de finalización es obligatoria').custom(isDate),
  validateFields
], updateEvent);

router.delete('/:id',[
  check('id', 'No es un id válido').isMongoId(),
  validateFields
], deleteEvent);

module.exports = router;