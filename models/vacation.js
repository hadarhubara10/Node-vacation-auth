const mongoose = require('mongoose');

const vacationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String },
  location: { type: String },
  image: { type: String },
  date: { type: String },
  price: { type: Number },
  followers: { type: String },
});
// categoryID: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
//   ref: 'Category',
// },
// image: { type: String },

module.exports = mongoose.model('Vacation', vacationSchema);
