const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/user/v1', userController.getUserList);
router.put('/user/add/v1', userController.addUser);
router.patch('/user/update/v1', userController.updateUser);
router.delete('/user/delete/v1', userController.deleteUser);

module.exports = router;