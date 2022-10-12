const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  id: mongoose.Types.ObjectId,
  discount: Number,
  products: Array,
});


const promoSchema = new Schema({
  id: mongoose.Types.ObjectId,
  title: String,
  description: String,
  discounts: [discountSchema],
  dateStart: Date,
  dateEnd: Date,
  coupon: String,
  isActive: Boolean
});

const model = mongoose.model('promo', promoSchema);
module.exports = model;
