const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//MODELO DE LA BD
const productSchema = new Schema({
  id: mongoose.Types.ObjectId,
  name: String,
  price: Number,
  image: String,
  idCategory: String,
  subCategories: Array, //Arreglo de Ids
  brand: String,
  count: Number
});
const model = mongoose.model('products', productSchema);
module.exports = model;
