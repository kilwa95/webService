const express = require('express');
const router = express.Router();
router.use(express.json());

const {createTransaction,getListTransaction} = require('./controller/transaction.controller');

router.post('/transactions', createTransaction);
router.get('/transactions', getListTransaction);

module.exports = router;

