
const Transaction = require('../models/Transaction');

exports.saveTransaction = async (data) => {
    try {
        const {priceTotal,delivery,cart} = data;
        return Transaction.findOneAndReplace({},
            {
            priceTotal:priceTotal,
            delivery:delivery,
            cart:cart,
            status:"pending"
            },{
            upsert: true,
            new: true,
            });
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