const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const storageSchema = new Schema({
  id: mongoose.Types.ObjectId,
  name: String,
  filename: String,
  path: String,
});
const model = mongoose.model('storage', storageSchema);
module.exports = model;
