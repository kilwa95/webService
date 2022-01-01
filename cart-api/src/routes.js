const express = require('express');
const router = express.Router();
router.use(express.json());
const {createCart,getCartByCustomerId,createCartEvent} = require('./controller/cart.controller');

router.post('/carts', createCart,createCartEvent);
router.get('/carts/:id/customer', getCartByCustomerId);

module.exports = router;

