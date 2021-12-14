const mongoose = require('mongoose');

const productCartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productID: mongoose.Schema.Types.ObjectId,
  productName: { type: String },
  img: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

module.exports = mongoose.model('ProductCart', productCartSchema);
