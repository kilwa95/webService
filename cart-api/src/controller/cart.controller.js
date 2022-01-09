const axios = require("axios");
const {saveCart,findCartById} = require('../queries/cart.querie');

 exports.createCart = async (req, res, next) => {
        const { customer, products } = req.body;
        try {
            const cart = await saveCart({ customer, products });
            if (cart) {
                return next();
            }
            else {
                res.status(400).json({
                    message: 'Cart not created'
                });
            }
           
        } catch (error) {
           console.log(error);
           res.status(500).json('internal server error');
        }
 }

exports.getCartByCustomerId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cart = await findCartById(id);
        res.status(200).json({
            message: 'Cart retrieved successfully',
            cart
        });
    } catch (error) {
        next(error);
    }
}

exports.createCartEvent = async (req, res, next) => {
    const { customer, products } = req.body;
    try {
        await axios.post(`http://172.22.0.9:4005/events`, {
            type: 'CartCreated',
            data: {
            customer,
            products
            }
    });
    return res.status(200).json({
        message: 'Cart created successfully',
    })
    } catch (error) {
       console.log(error.message);
         res.status(500).json('internal server error');
    }
}

exports.handleEvent = async (req, res, next) => {
    const { type, data } = req.body;
    try {
        console.log(req.body);
    } catch (error) {
        next(error);
    }
}
