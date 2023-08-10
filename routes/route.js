const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/ask', controller.askQuestion);
router.post('/extract-and-store', controller.extractAndStoreData);
router.get('/responses', controller.getResponses);

module.exports = router;