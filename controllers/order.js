const moment = require('moment');
const mongoose = require('mongoose');
const Order = require('../models/order');
module.exports = {
  getAllOrders: (req, res) => {
    Order.find()
      .then((order) => {
        res.status(200).json({ order });
      })
      .catch((err) =>
        res.status(500).json({
          error,
        })
      );
  },
  getOrder: (req, res) => {
    const orderID = req.params.orderID;
    Order.findById(orderID)
      .then((order) => {
        res.status(200).json({ order });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  },
  createOrder: async (req, res) => {
    // userID - from user.js
    const { userID, productsCartID } = req.body;

    const orderDetails = new Order({
      _id: mongoose.Types.ObjectId(),
      userID,
      productsID: productsCartID,
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    });
    await orderDetails.save();
    return res.status(201).json({ message: 'order created!', orderDetails });
  },
};
