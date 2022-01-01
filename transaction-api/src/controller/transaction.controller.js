
const {saveTransaction,findAllTransaction} = require('../queries/transaction.querie');

exports.createTransaction = async (req, res) => {
    try {
        const {priceTotal,delivery,cart} = req.body;
        const transaction = await saveTransaction({ priceTotal,delivery,cart });
        res.status(200).json({
            message: 'Cart created successfully',
            transaction
        });
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