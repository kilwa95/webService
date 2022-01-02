const Cart = require('../models/Cart');


exports.saveCart = async (data) => {
    try {
        const {products,customer} = data;
        const cart = await Cart.create({ products,customer });
        return cart;
    } catch (error) {
        console.error(error);
    }
}

exports.findCartById= async (id) => {
    try {
        return Cart.findOne({ _id: id});
    } catch (error) {
        console.error(error);
    }
}