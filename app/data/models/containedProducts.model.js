const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELOS DE LA BD
const containedProducts = new Schema({
  idProdcut: mongoose.Types.ObjectId,
  count: Number,
  total: Number,
});

module.exports = containedProducts;
