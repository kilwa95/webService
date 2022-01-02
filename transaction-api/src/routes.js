const express = require('express');
const router = express.Router();
router.use(express.json());

const {createTransaction,getListTransaction,createTransactionEvent} = require('./controller/transaction.controller');

router.post('/transactions', createTransaction,createTransactionEvent);
router.get('/transactions', getListTransaction);
router.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
  });
  

module.exports = router;

