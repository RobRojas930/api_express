const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const categorySchema = new Schema({
  id: mongoose.Types.ObjectId,
  idProduct: String,
  name: String,
});
const model = mongoose.model('categories', categorySchema);
module.exports = model;
