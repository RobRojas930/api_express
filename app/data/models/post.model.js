const mongoose = require('mongoose');
const StorageSchema = require('../models/storage.model');
const PromoSchema = require('../models/promo.model');


const Schema = mongoose.Schema;
//MODELO DE LA BD
//DEFINIR
const postSchema = new Schema({
  id: mongoose.Types.ObjectId,
  title:String,
  description: String,
  images: [StorageSchema],
  promos: [PromoSchema],
});
const model = mongoose.model('post', postSchema);
module.exports = model;
