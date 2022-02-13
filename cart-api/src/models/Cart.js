const { Schema } = require("mongoose");
const connection = require('../config/mongo');

const cartSchema = new Schema({
  customer: Object,
  products: Array,
});

const CartMongo = connection.model("cart", cartSchema);

module.exports = CartMongo