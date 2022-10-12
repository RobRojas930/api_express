const mongoose = require('mongoose');
const containedProducts = require('./containedProducts.model');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const clientSchema = new Schema({
  id: String,
  name: String,
  lastname: String,
  products: [containedProducts],
});
const model = mongoose.model('clients', clientSchema);
module.exports = model;
