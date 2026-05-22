const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.get('/time', tradeController.getTime);
router.post('/create', tradeController.createTrade);

module.exports = router;
