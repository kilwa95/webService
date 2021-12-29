const Cart = require('../models/Cart');


exports.saveCart = async (data) => {
    try {
        const {products,customer} = data;
        return Cart.findOneAndReplace({},{products:products,customer:customer},{
            upsert: true,
            new: true,
            });
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