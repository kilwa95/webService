const express = require('express');
const router = express.Router();
router.use(express.json());
const {createCart,getCartByCustomerId,createCartEvent,handleEvent} = require('./controller/cart.controller');

router.post('/carts', createCart,createCartEvent);
router.get('/carts/:id/customer', getCartByCustomerId);
router.post('/events',handleEvent);

module.exports = router;

