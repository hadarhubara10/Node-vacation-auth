var express = require('express');
const router = express.Router();
const { getAllVacations } = require('../controllers/vacation');

router.get('/', getAllVacations);

module.exports = router;
