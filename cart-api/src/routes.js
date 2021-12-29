const express = require('express');
const router = express.Router();
router.use(express.json());
const {createCart,getCartByCustomerId} = require('./controller/cart.controller');

router.post('/carts', createCart)
router.get('/carts/:id/customer', getCartByCustomerId)

module.exports = router;

