const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/signup', controller.signUp);
router.get('/signup',controller.getSignup);

router.post('/login', controller.login);
router.put('/update-password', controller.updatePassword);
router.delete('/delete-user', controller.deleteUser);

router.post('/management', controller.management);
router.get('/management',controller.getManagement);

router.post('/it', controller.it);
router.get('/it',controller.getIt);

router.post('/cleaners', controller.cleaners);
router.get('/cleaners',controller.getCleaners);

router.post('/security', controller.security);
router.get('/security',controller.getSecurity);

router.post('/finance', controller.finance);
router.get('/finance',controller.getFinance);

router.post('/department',controller.departments);
router.get('/department',controller.getDepartments);

router.post('/company-finances', controller.companyFinance);
router.get('/company-finances',controller.getCompanyFinance);

module.exports = router;