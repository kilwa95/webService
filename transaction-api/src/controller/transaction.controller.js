const axios = require("axios");
const {saveTransaction,findAllTransaction} = require('../queries/transaction.querie');

exports.createTransaction = async (req, res,next) => {
    try {
        const {priceTotal,delivery,cart} = req.body;
        const transaction = await saveTransaction({ priceTotal,delivery,cart });
        return next();
    } catch (error) {
        console.error(error)
    }
}

exports.getListTransaction = async (req, res) => {
    try {
        const transaction = await findAllTransaction();
        res.status(200).json({
            message: 'List transaction',
            transaction
        });
    } catch (error) {
        console.error(error)
    }
}

exports.createTransactionEvent = async (req, res, next) => {
    const {priceTotal,delivery,cart} = req.body;
    try {
       return await axios.post('http://172.22.0.10:4005/events', {
            type: 'TransactionCreated',
            data: {
                priceTotal,
                delivery,
                cart
            }
    });
    } catch (error) {
        next(error);
    }
}