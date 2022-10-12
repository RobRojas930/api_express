const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const subCategorySchema = new Schema({
  id: mongoose.Types.ObjectId,
  name: String,
});
const model = mongoose.model('subcategories', subCategorySchema);
module.exports = model;
