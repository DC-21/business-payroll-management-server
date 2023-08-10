const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/extract-and-store', controller.extractAndStoreData);
module.exports = router;