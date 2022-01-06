const { Schema } = require("mongoose");
const connection = require('../config/mongo');

const payementSchema = new Schema({
  tranasction_id: Number,
  products: Array,
  customer: Object,
});

const PayementMongo = connection.model("payemnt", payementSchema);

module.exports = PayementMongo