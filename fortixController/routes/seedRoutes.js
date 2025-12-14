const express = require('express');
const router = express.Router();
const seedCtrl = require('../controller/seedController');

router.post('/', seedCtrl.seed);

module.exports = router;
