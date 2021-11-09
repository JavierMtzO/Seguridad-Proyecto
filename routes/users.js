const express = require('express');
const router = express.Router();
path = require('path')
const userController = require('../controllers/user-controller');

router.get('/', userController.getLogin);
router.post('/', userController.postLogin);

router.get('/inicio', userController.getHome);
router.post('/inicio', userController.logout);

module.exports = router;