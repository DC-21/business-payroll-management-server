const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/signup', controller.signUp);
router.post('/login', controller.login);
router.put('/update-password', controller.updatePassword);
router.delete('/delete-user', controller.deleteUser);

router.post('/management', controller.management);
router.post('/it', controller.it);
router.post('/cleaners', controller.cleaners);

module.exports = router;