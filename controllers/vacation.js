const mongoose = require('mongoose');
// const product = require('../models/product');
const Vacation = require('../models/vacation');
// const Category = require('../models/category');
module.exports = {
  getAllVacations: (req, res) => {
    Vacation.find()
      // .populate('categoryID', 'title')
      .then((vacation) => {
        res.status(200).json(vacation);
      })
      .catch((err) =>
        res.status(500).json({
          err,
        })
      );
  },

  // getProduct: (req, res) => {
  //   const productID = req.params.productID;
  //   Product.findById(productID)
  //     .then((product) => {
  //       console.log(product);
  //       res.status(200).json({ product });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ message: err });
  //     });
  // },
};
