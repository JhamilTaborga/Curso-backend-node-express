const express = require('express');
const passport = require('passport')

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService;

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  // validatorHandler(createOrderSchema, 'body'), este validatorHandler lo quitamos porque leeremos su Id directamente con el servicio y JWT.
  async (req, res, next) => {
    try{
      const body = {
        userId: req.user.sub
      }
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);
// Debo proteger esta ruta para que solo pueda elimanar una orden un Admin.
router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.status(201).json(rta);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;
