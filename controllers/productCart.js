const mongoose = require('mongoose');
const Product = require('../models/product');
const ProductCart = require('../models/productCart');
module.exports = {
  getCart: (req, res) => {
    ProductCart.find()
      .then((products) => {
        res.status(200).json({ products });
      })
      .catch((err) =>
        res.status(500).json({
          err,
        })
      );
  },
  addProductToCart: (req, res) => {
    const productID = req.params.productID;
    const validID = mongoose.Types.ObjectId.isValid(productID);
    if (!validID) {
      return res.status(404).json({ message: 'product not found' });
    }
    Product.findById(productID)
      .then((prod) => {
        const { _id, productName, img, price, quantity } = prod;
        console.log(_id);
        const productCart = new ProductCart({
          _id: mongoose.Types.ObjectId(),
          productID: _id,
          productName,
          img,
          price,
          quantity,
        });

        return productCart.save();
      })
      .then((prod) => {
        res.status(200).json({ prod });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  updateProduct: (req, res) => {
    const productID = req.params.productID;
    const validID = mongoose.Types.ObjectId.isValid(productID);
    if (!validID) {
      return res.status(404).json({ message: 'product not found' });
    }
    const { add } = req.body;
    // check id add or remove
    let update = 1;
    if (!add) {
      update = -1;
    }
    ProductCart.findOneAndUpdate(
      { productID: productID },
      { $inc: { quantity: update } },
      /* to change obj to new obj  */ {
        new: true,
      }
    )
      .then((prod) => {
        return res.status(200).json({
          prod,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          err,
        });
      });
  },
  deleteProduct: (req, res) => {
    const productID = req.params.productID;

    const validID = mongoose.Types.ObjectId.isValid(productID);
    if (!validID) {
      return res.status(404).json({ message: 'product not found' });
    }
    ProductCart.findOneAndDelete({ productID: productID })
      .then(() => {
        res.status(200).json({
          message: 'Product deleted',
        });
      })
      .catch((err) => {
        res.status(500).json({
          err,
        });
      });
  },
  deleteAllCart: (req, res) => {
    ProductCart.remove()
      .then(() => {
        return res.status(200).json({
          message: 'cart deleted',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          err,
        });
      });
  },
};
