const mongoose = require('mongoose');
const containedProducts = require('./containedProducts.model');
const Schema = mongoose.Schema;
//MODELO DE LA BD

const orderSchema = new Schema({
  status: Boolean,
  id: mongoose.Types.ObjectId,
  total: Number,
  idCliente: mongoose.Types.ObjectId,
  products: [containedProducts],
});
const model = mongoose.model('orders', orderSchema);
module.exports = model;
