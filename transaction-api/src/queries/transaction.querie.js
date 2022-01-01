
const Transaction = require('../models/Transaction');

exports.saveTransaction = async (data) => {
    try {
        const {priceTotal,delivery,cart} = data;
        const transaction = await Transaction.create({ priceTotal,delivery,cart });
        return transaction;
    } catch (error) {
        console.error(error);
    }
}

exports.findAllTransaction = async () => {
    try {
        return Transaction.find({});
    } catch (error) {
        console.error(error);
    }
}