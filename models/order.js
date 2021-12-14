const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: mongoose.Schema.Types.ObjectId,
  productsID: [{ type: mongoose.Schema.Types.ObjectId }],
  date: { type: String },
});

module.exports = mongoose.model('Order', orderSchema);
