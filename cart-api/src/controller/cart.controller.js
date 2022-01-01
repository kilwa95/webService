 const {saveCart,findCartById} = require('../queries/cart.querie');

 exports.createCart = async (req, res, next) => {
        const { customer, products } = req.body;
        try {
            const cart = await saveCart({ customer, products });
            res.status(200).json({
                message: 'Cart created successfully',
                cart
            });
        } catch (error) {
            next(error);
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
       return await axios.post('http://172.22.0.10:4005/events', {
            type: 'CartCreated',
            data: {
            customer,
            products
            }
    });
    } catch (error) {
        next(error);
    }
}
