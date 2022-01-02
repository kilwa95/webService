const { Schema } = require("mongoose");
const connection = require('../config/mongo');

const transactionSchema = new Schema({
  priceTotal: Number,
  delivery: Object,
  status: String,
  cart: Array,
});

const TransactionMongo = connection.model("transaction", transactionSchema);

module.exports = TransactionMongo