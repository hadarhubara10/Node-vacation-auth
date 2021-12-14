var express = require('express');
const router = express.Router();
const { getAllOrders, getOrder, createOrder } = require('../controllers/order');
router.get('/', getAllOrders);
router.get('/:orderID', getOrder);
router.post('/', createOrder);
// router.patch('/:userID', updateUser);
// router.delete('/:userID', deleteUser);

module.exports = router;
