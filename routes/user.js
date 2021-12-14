const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  signUp,
  verifyTokenGoogle,
  signIn,
  checkToken,
  // getToken,
} = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken');

router.get('/', getAllUsers);
router.post('/', signUp);
router.get('/verifyTokenGoogle', verifyTokenGoogle);
router.post('/signin', signIn);
router.post('/checkToken', verifyToken, checkToken);
// router.patch('/:userID', updateUser);
// router.delete('/:userID', deleteUser);

module.exports = router;
