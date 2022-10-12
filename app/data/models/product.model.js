const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const productSchema = new Schema({
  id: mongoose.Types.ObjectId,
  name: String,
  price: Number,
  image: String,
  categories: Array,
  brand: String,
});
const model = mongoose.model('products', productSchema);
module.exports = model;
