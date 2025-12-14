const express = require('express');
const router = express.Router();
const { createSale, getSales } = require('../controller/salesController');

router.post('/', createSale);
router.get('/', getSales);

module.exports = router;
